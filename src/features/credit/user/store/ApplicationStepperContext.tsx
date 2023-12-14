import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DefaultValues } from 'react-hook-form'
import { ZodObject, ZodRawShape } from 'zod'

import {
  IBaseFormStepperProviderProps,
  IFormStepperContextValue,
  IFormSteps,
  useFormStepperProvider,
} from '@/components/ui/FormStepper'
import { Vehicle } from '@/features/vehicles/common'
import { Entries } from '@/types'
import storage from '@/utils/storage'

import { Applicant, Application, ApplicationProgress, PubliclyExposedPerson } from '../../common'
import {
  getApplicantDataByApplicationId,
  getApplicantDataByIdentification,
} from '../api/getApplicantData'
import { getApplicationProcess } from '../api/getApplication'
import {
  ApplicationRefs,
  creditSchema,
  financialAndLaborInfoSchema,
  FinancialAndLaborInfoValues,
  ForeignProductsSchema,
  ForeignProductsValues,
  FullCreditValues,
  goodsAndVehicleSchema,
  GoodsAndVehicleValues,
  OTPVerificationStatus,
  pepsSchema,
  PepsValues,
  personalInfoSchema,
  PersonalInfoValues,
  referencesSchema,
  ReferenceValues,
} from '../components/NewApplicationForms'

type ApplicationStepperSteps = {
  personalInfo: PersonalInfoValues
  financialAndLaborInfo: FinancialAndLaborInfoValues
  pepsInfo: PepsValues
  foreignProducts: ForeignProductsValues
  goodsAndVehicles: GoodsAndVehicleValues
  references: ReferenceValues
  creditInfo: FullCreditValues
}

type ApplicationStepperSchemas = {
  [key in keyof ApplicationStepperSteps]: ZodObject<ZodRawShape>
}

type ApplicationVehicle = Pick<
  Vehicle,
  'vehicleId' | 'grossValue' | 'initialFee' | 'line' | 'brand'
>

type BaseStepperContextValue = IFormStepperContextValue<ApplicationStepperSteps>
type ApplicationContextValue = {
  applicationId: string
  applicationRef?: ApplicationRefs
  vehicle: ApplicationVehicle
  isLoading: boolean
  otpVerificationStatus: OTPVerificationStatus
  nextStep: () => void
  previousStep: () => void
  fetchApplicantDataAfterVerification: () => void
  handleSaveProcess: () => void
  handleAskAssistance: () => void
  setOtpVerificationStatus: (status: OTPVerificationStatus) => void
}
type ApplicationStepperContextValue = BaseStepperContextValue & ApplicationContextValue

const ApplicationStepperContext = createContext({} as ApplicationStepperContextValue)

const STEPS_QUANTITY = 7

type ApplicationStepperProviderProps = {
  applicationRef?: ApplicationRefs
  applicationId: string
  vehicle: Pick<Vehicle, 'vehicleId' | 'grossValue' | 'initialFee' | 'line' | 'brand'>
  onComplete: (values: Application) => void
  onSaveProcess: (data: ApplicationProgress) => void
  onAskAssistance: (data: ApplicationProgress) => void
}

export const ApplicationStepperProvider = ({
  children,
  applicationRef,
  applicationId,
  vehicle,
  onComplete,
  onSaveProcess,
  onAskAssistance,
}: // initialStepIndex,
IBaseFormStepperProviderProps<ApplicationStepperSteps> & ApplicationStepperProviderProps) => {
  const selectedCreditValues = useMemo(() => {
    return storage.getCreditValues()
  }, [])

  const value = useFormStepperProvider<ApplicationStepperSteps>({
    defaultValues: {
      creditInfo: {
        deadline: selectedCreditValues.fee,
        initialPayment: selectedCreditValues.initialPayment,
      },
      financialAndLaborInfo: undefined,
      foreignProducts: undefined,
      goodsAndVehicles: undefined,
      pepsInfo: undefined,
      personalInfo: undefined,
      references: undefined,
    },
    stepsQuantity: STEPS_QUANTITY,
    onComplete: (values) =>
      onComplete(transformValuesToApplication({ applicationId, values, vehicle })),
  })
  const [isLoading, setIsLoading] = useState(Boolean(applicationRef))
  const [otpVerificationStatus, setOtpVerificationStatus] = useState(OTPVerificationStatus.pending)

  const { steps, setSteps, activeStepIndex, setActiveStepIndex, setLastStepChecked } = value.form
  const nextStep = () => setActiveStepIndex((prevStep) => prevStep + 1)
  const previousStep = () => setActiveStepIndex((prevStep) => prevStep - 1)

  const getStepsValuesOfPreviosApplication = async (
    identificationNumber: string
  ): Promise<DefaultValues<ApplicationStepperSteps> | null> => {
    if (!identificationNumber) return null

    try {
      const { data } = await getApplicantDataByIdentification(identificationNumber)
      const defaultValues = transformApplicantToFormValues(data)

      return defaultValues
    } catch (error) {
      return null
    }
  }

  const getStepsValuesOfVerification =
    async (): Promise<DefaultValues<ApplicationStepperSteps> | null> => {
      try {
        const { data } = await getApplicantDataByApplicationId(applicationId)

        return { personalInfo: data }
      } catch {
        return null
      }
    }

  const getStepsValuesOfSavedProcess = async () => {
    try {
      const { data } = await getApplicationProcess({ id: applicationId })
      return data
    } catch (error) {
      return null
    }
  }

  const fetchApplicantDataAfterVerification = async () => {
    try {
      const valuesOfVerification = await getStepsValuesOfVerification()
      const valuesOfPrevApplication = await getStepsValuesOfPreviosApplication(
        valuesOfVerification?.personalInfo?.identificationNumber ?? ''
      )

      if (!valuesOfVerification && !valuesOfPrevApplication) return

      setActiveStepIndex(1) // Index of personal info form
      setSteps((prevStepsValues) => {
        const newStepsValues = {} as IFormSteps<ApplicationStepperSteps>
        for (const key in prevStepsValues) {
          const typedKey = key as keyof ApplicationStepperSteps

          const { isDirty, isValid, currentValues } = prevStepsValues[typedKey]
          newStepsValues[typedKey] = {
            isDirty,
            isValid,
            currentValues: {
              ...currentValues,
              ...(valuesOfVerification && valuesOfVerification[typedKey]),
              ...(valuesOfPrevApplication && valuesOfPrevApplication[typedKey]),
            },
          }
        }

        return newStepsValues
      })
      setIsLoading(false)
    } catch (error) {}
  }

  const fetchSavedProgress = async () => {
    const application = await getStepsValuesOfSavedProcess()
    if (!application || !application.applicant) return

    const valuesOfSavedProgress = transformApplicantToFormValues(application.applicant)
    valuesOfSavedProgress.creditInfo = {
      deadline: application.requestDetail?.deadline,
      initialPayment: application.requestDetail?.initialPayment,
      quotaOriginId: application.requestDetail?.quotaOriginId,
    }

    const stepsSchemas: ApplicationStepperSchemas = {
      creditInfo: creditSchema,
      financialAndLaborInfo: financialAndLaborInfoSchema,
      foreignProducts: ForeignProductsSchema,
      goodsAndVehicles: goodsAndVehicleSchema,
      pepsInfo: pepsSchema,
      personalInfo: personalInfoSchema,
      references: referencesSchema,
    }

    setActiveStepIndex(application.step)
    setLastStepChecked(application.step - 1)
    if (application.step >= 2) {
      setOtpVerificationStatus(OTPVerificationStatus.verified)
    }
    setSteps(() => {
      const newStepsValues = {} as IFormSteps<ApplicationStepperSteps>
      const stepsValuesEntries = Object.entries(valuesOfSavedProgress)

      stepsValuesEntries.forEach(([key, values]) => {
        const typedKey = key as keyof ApplicationStepperSteps

        const { success } = stepsSchemas[typedKey].safeParse(values)

        newStepsValues[typedKey] = {
          isDirty: false,
          isValid: success,
          ...(success ? { validValues: values as any } : { currentValues: values }),
        }
      })

      return newStepsValues
    })
    setIsLoading(false)
  }

  const transformStepValuesToApplicationProcess = (): ApplicationProgress => {
    const values = {} as DefaultValues<ApplicationStepperSteps>

    const stepsAsEntries = Object.entries(steps) as Entries<IFormSteps<ApplicationStepperSteps>>
    stepsAsEntries.forEach(([key, form]) => {
      const typedKey = key as keyof ApplicationStepperSteps
      values[typedKey] = {
        ...form.currentValues,
        ...form.validValues,
      }
    })

    const application = transformValuesToOptionalApplication({ applicationId, values, vehicle })

    return {
      ...application,
      code: applicationId,
      step: activeStepIndex,
    }
  }

  const handleSaveProcess = () => {
    const application = transformStepValuesToApplicationProcess()
    onSaveProcess(application)
  }

  const handleAskAssistance = () => {
    onAskAssistance(transformStepValuesToApplicationProcess())
  }

  useEffect(() => {
    if (!applicationRef) return

    switch (applicationRef) {
      case ApplicationRefs.manualVerification:
        fetchApplicantDataAfterVerification()
        break
      case ApplicationRefs.continueConsultant:
      case ApplicationRefs.continueProgress:
        fetchSavedProgress()
        break
    }
  }, [])

  return (
    <ApplicationStepperContext.Provider
      value={{
        ...value,
        isLoading,
        applicationRef,
        nextStep,
        previousStep,
        applicationId,
        vehicle,
        fetchApplicantDataAfterVerification,
        handleSaveProcess,
        handleAskAssistance,
        setOtpVerificationStatus,
        otpVerificationStatus,
      }}
    >
      {children}
    </ApplicationStepperContext.Provider>
  )
}

export const useApplicationStepper = () => useContext(ApplicationStepperContext)

type TransformValuesToApplicationParams<
  T extends ApplicationStepperSteps | DefaultValues<ApplicationStepperSteps>
> = {
  vehicle: ApplicationVehicle
  values: T
  applicationId: string
}

const transformValuesToOptionalApplication = ({
  applicationId,
  values,
  vehicle,
}: TransformValuesToApplicationParams<DefaultValues<ApplicationStepperSteps>>) => {
  const {
    creditInfo = {} as FullCreditValues,
    financialAndLaborInfo = {} as FinancialAndLaborInfoValues,
    foreignProducts = {} as ForeignProductsValues,
    goodsAndVehicles = {} as GoodsAndVehicleValues,
    pepsInfo = {} as PepsValues,
    references: { references } = {} as ReferenceValues,
  } = values
  const { totalMonthlyIncome, ...applicantWork } = financialAndLaborInfo
  const publiclyExposedPerson: DefaultValues<PubliclyExposedPerson> | undefined =
    !pepsInfo.publiclyExposedPerson
      ? undefined
      : {
          ...pepsInfo.publiclyExposedPerson,
          unbundlingDate: pepsInfo?.publiclyExposedPerson?.unbundlingDate
            ? new Date(pepsInfo.publiclyExposedPerson.unbundlingDate).toJSON()
            : undefined,
        }
  const { goods = [], vehicles: applicantVehicles = [] } = goodsAndVehicles

  const application: DefaultValues<Application> = {
    applicant: {
      ...values.personalInfo,
      applicantDetail: {
        totalMonthlyIncome,
        applicantWork,
        ...foreignProducts,
        ...pepsInfo,
        publiclyExposedPerson,
      },
      references,
      goods,
      applicantVehicles,
    },
    code: applicationId,
    hdim: '',
    jsc: '',
    requestDetail: {
      ...creditInfo,
      requestedVehicle: { vehicleId: vehicle.vehicleId },
    },
  }

  return application
}

const transformValuesToApplication = ({
  applicationId,
  values,
  vehicle,
}: TransformValuesToApplicationParams<ApplicationStepperSteps>) => {
  const {
    creditInfo,
    financialAndLaborInfo,
    foreignProducts,
    goodsAndVehicles,
    pepsInfo,
    references: { references },
  } = values
  const { totalMonthlyIncome, ...applicantWork } = financialAndLaborInfo
  const publiclyExposedPerson: PubliclyExposedPerson | undefined = !pepsInfo.publiclyExposedPerson
    ? undefined
    : {
        ...pepsInfo.publiclyExposedPerson,
        unbundlingDate: pepsInfo.publiclyExposedPerson.unbundlingDate
          ? new Date(pepsInfo.publiclyExposedPerson.unbundlingDate).toJSON()
          : undefined,
      }
  const { goods = [], vehicles: applicantVehicles = [] } = goodsAndVehicles

  const application: Application = {
    applicant: {
      ...values.personalInfo,
      applicantDetail: {
        totalMonthlyIncome,
        applicantWork,
        ...foreignProducts,
        ...pepsInfo,
        publiclyExposedPerson,
      },
      references,
      goods,
      applicantVehicles,
    },
    code: applicationId,
    hdim: '',
    jsc: '',
    requestDetail: {
      ...creditInfo,
      requestedVehicle: { vehicleId: vehicle.vehicleId },
    },
  }

  return application
}
const transformApplicantToFormValues = (
  applicant: DefaultValues<Applicant>
): DefaultValues<ApplicationStepperSteps> => {
  const {
    applicantDetail,
    goods,
    references,
    applicantVehicles: vehicles,
    ...personalInfo
  } = applicant

  const {
    // Financial and labor
    totalMonthlyIncome,
    applicantWork,
    // PEPs
    isPublicServant,
    publiclyExposedPerson = {} as PubliclyExposedPerson,
    // Foreign products
    hasInternationalAccount,
    hasInternationalBusiness,
    hasInternationalPatrimony,
    internationalAccount,
    internationalBusiness,
    internationalPatrimony,
  } = applicantDetail ?? {}

  return {
    personalInfo: {
      ...personalInfo,
      expeditionDate: personalInfo?.expeditionDate?.split('T')?.[0],
      birthDate: personalInfo?.birthDate?.split('T')?.[0],
    },
    financialAndLaborInfo: {
      totalMonthlyIncome,
      ...applicantWork,
    },
    pepsInfo: {
      isPublicServant,
      ...(isPublicServant && {
        publiclyExposedPerson: {
          ...publiclyExposedPerson,
          unbundlingDate: publiclyExposedPerson?.unbundlingDate?.split('T')?.[0],
        },
      }),
    },
    foreignProducts: {
      hasInternationalAccount,
      hasInternationalBusiness,
      hasInternationalPatrimony,
      internationalAccount,
      internationalBusiness,
      internationalPatrimony,
    },
    goodsAndVehicles: {
      goods,
      vehicles,
    },
    references: { references },
  }
}
