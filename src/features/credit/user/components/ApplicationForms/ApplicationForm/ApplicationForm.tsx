import { FC, useState } from 'react'
import { Applicant, Application } from '@credit/common'
import { Vehicle } from '@vehicles/common/types'

import { DefaultValuesForm } from '@/types'

import { CreditForm, FullCreditValues } from '../CreditForm'
import { FinancialAndLaborInfoForm } from '../FinancialAndLaborInfoForm'
import { ForeignProductsForm, ForeignProductsValues } from '../ForeignProductsForm'
import { FormStep } from '../FormStep'
import { GoodsAndVehiclesForm, GoodsAndVehicleValues } from '../GoodsAndVehiclesForm'
import { PepsForm, PepsValues } from '../PepsForm'
import { PersonalInfoForm } from '../PersonalInfoForm'
import { ReferencesForm, ReferenceValues } from '../ReferencesForm'
import { VerificationForm } from '../VerificationForm'

import { useApplicationForm } from './useApplicationForm'

export type ApplicationFormProps = {
  applicationId: string
  vehicle: Pick<Vehicle, 'vehicleId' | 'grossValue' | 'initialFee' | 'line' | 'brand'>
  isVerified?: boolean
  onSuccess: (data: Application) => void
}

export const ApplicationForm: FC<ApplicationFormProps> = ({
  applicationId,
  vehicle,
  isVerified,
  onSuccess,
}) => {
  const [applicant, setApplicant] = useState({} as Applicant)

  const {
    activeStep,
    nextStep,
    previousStep,
    setPepsInfo,
    setFinancialAndLaborInfo,
    setForeignProducts,
    setGoodsAndVehicles,
    setPersonalInfo,
    setReferences,
    setCreditInfo,
    pepsInfo,
    financialAndLaborInfo,
    foreignProducts,
    goodsAndVehicles,
    personalInfo,
    references,
    creditInfo,
    defaultPersonalInfo,
    defaultFinancialAndLaborInfo,
    defaultPepsInfo,
    defaultForeignProducts,
    defaultGoodsAndVehicles,
    defaultReferences,
    getVerificationData,
  } = useApplicationForm({ onSuccessApplicant: setApplicant, isVerified, applicationId })

  const onSuccessCredit = (values: FullCreditValues) => {
    setCreditInfo(values)
    const application: Application = {
      applicant,
      requestDetail: {
        ...values,
        requestedVehicle: {
          vehicleId: vehicle.vehicleId,
        },
      },
      code: applicationId,
      hdim: '',
      jsc: '',
    }

    onSuccess(application)
  }

  return (
    <>
      <FormStep index={1} active={activeStep}>
        <VerificationForm
          applicationId={applicationId}
          vehicleId={vehicle.vehicleId}
          onSuccess={() => {
            getVerificationData()
          }}
        />
      </FormStep>
      <FormStep index={2} active={activeStep}>
        <PersonalInfoForm
          defaultValues={personalInfo ?? defaultPersonalInfo}
          applicationId={applicationId}
          onPrevious={previousStep}
          onSuccess={(values) => {
            setPersonalInfo(values)
            nextStep()
          }}
        />
      </FormStep>
      <FormStep index={3} active={activeStep}>
        <FinancialAndLaborInfoForm
          defaultValues={financialAndLaborInfo ?? defaultFinancialAndLaborInfo}
          onSuccess={(values) => {
            setFinancialAndLaborInfo(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={4} active={activeStep}>
        <PepsForm
          defaultValues={pepsInfo ?? (defaultPepsInfo as DefaultValuesForm<PepsValues>)}
          onSuccess={(values) => {
            setPepsInfo(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={5} active={activeStep}>
        <ForeignProductsForm
          defaultValues={
            foreignProducts ?? (defaultForeignProducts as DefaultValuesForm<ForeignProductsValues>)
          }
          onSuccess={(values) => {
            setForeignProducts(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={6} active={activeStep}>
        <GoodsAndVehiclesForm
          defaultValues={
            goodsAndVehicles ??
            (defaultGoodsAndVehicles as DefaultValuesForm<GoodsAndVehicleValues>)
          }
          onSuccess={(values) => {
            setGoodsAndVehicles(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={7} active={activeStep}>
        <ReferencesForm
          defaultValues={references ?? (defaultReferences as DefaultValuesForm<ReferenceValues>)}
          onSuccess={(values) => {
            setReferences(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={8} active={activeStep}>
        <CreditForm
          onSuccess={onSuccessCredit}
          onPrevious={previousStep}
          vehicle={vehicle}
          defaultValues={creditInfo}
        />
      </FormStep>
    </>
  )
}
