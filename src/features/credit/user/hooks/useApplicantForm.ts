import { useEffect, useRef, useState } from 'react'
import { DefaultValues } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Applicant, PubliclyExposedPerson } from '@credit/common'

import { useSteps } from '@/hooks/useSteps'

import {
  getApplicantDataByApplicationId,
  getApplicantDataByIdentification,
} from '../api/getApplicantData'
import {
  FinancialAndLaborInfoValues,
  ForeignProductsValues,
  GoodsAndVehicleValues,
  PepsValues,
  PersonalInfoValues,
  ReferenceValues,
} from '../components/ApplicationForms'

export type UseApplicantForm = {
  onSuccess: (applicant: Applicant) => void
  applicationId: string
  guarantorId?: number
  isVerified?: boolean
}

export const useApplicantForm = ({
  onSuccess,
  isVerified,
  applicationId,
  guarantorId,
}: UseApplicantForm) => {
  const mounted = useRef(false)

  const [isLoading, setIsLoading] = useState(isVerified)

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoValues>()
  const [financialAndLaborInfo, setFinancialAndLaborInfo] = useState<FinancialAndLaborInfoValues>()
  const [pepsInfo, setPepsInfo] = useState<PepsValues>()
  const [foreignProducts, setForeignProducts] = useState<ForeignProductsValues>()
  const [goodsAndVehicles, setGoodsAndVehicles] = useState<GoodsAndVehicleValues>()
  const [references, setReferences] = useState<ReferenceValues>()

  const [defaultPersonalInfo, setDefaultPersonalInfo] =
    useState<DefaultValues<PersonalInfoValues>>()
  const [defaultFinancialAndLaborInfo, setDefaultFinancialAndLaborInfo] =
    useState<DefaultValues<FinancialAndLaborInfoValues>>()
  const [defaultPepsInfo, setDefaultPepsInfo] = useState<DefaultValues<PepsValues>>()
  const [defaultForeignProducts, setDefaultForeignProducts] =
    useState<DefaultValues<ForeignProductsValues>>()
  const [defaultGoodsAndVehicles, setDefaultGoodsAndVehicles] =
    useState<DefaultValues<GoodsAndVehicleValues>>()
  const [defaultReferences, setDefaultReferences] = useState<DefaultValues<ReferenceValues>>()

  const steps = useSteps()

  const handleSuccess = () => {
    if (!personalInfo) return
    if (!financialAndLaborInfo) return
    if (!foreignProducts) return
    if (!pepsInfo) return
    if (!references) return

    const { totalMonthlyIncome, ...applicantWork } = financialAndLaborInfo
    const publiclyExposedPerson: PubliclyExposedPerson | undefined = !pepsInfo.publiclyExposedPerson
      ? undefined
      : {
          ...pepsInfo.publiclyExposedPerson,
          unbundlingDate: pepsInfo.publiclyExposedPerson.unbundlingDate
            ? new Date(pepsInfo.publiclyExposedPerson.unbundlingDate).toJSON()
            : undefined,
        }

    const data: Applicant = {
      ...personalInfo,
      birthDate: new Date(personalInfo.birthDate).toJSON(),
      expeditionDate: new Date(personalInfo.expeditionDate).toJSON(),
      applicantDetail: {
        totalMonthlyIncome,
        applicantWork,
        ...foreignProducts,
        ...pepsInfo,
        publiclyExposedPerson,
      },
      references: references!.references,
      goods: goodsAndVehicles!.goods ?? [],
      applicantVehicles: goodsAndVehicles!.vehicles ?? [],
    }

    onSuccess(data)
  }

  const getVerificationData = async () => {
    try {
      const { data } = await getApplicantDataByApplicationId(applicationId, guarantorId)

      setDefaultPersonalInfo(data)
      getApplicantData(data.identificationNumber)
    } catch (error: any) {
      const status = error?.response?.status
      if (status !== 404) {
        toast.error('Hemos tenido problemas al obtener la información de solicitante')
        setIsLoading(false)
      }
    }
  }

  const getApplicantData = async (identificationNumber: string) => {
    try {
      const { data } = await getApplicantDataByIdentification(identificationNumber)

      const { applicantDetail, goods, references, applicantVehicles } = data

      setDefaultPersonalInfo((prevData) => ({
        ...prevData,
        address: data.address,
        birthDate: data.birthDate.split('T')[0],
        cityId: data.cityId,
        departmentId: data.departmentId,
        dependants: data.dependants,
        email: data.email,
        expeditionDate: data.expeditionDate.split('T')[0],
        gender: data.gender,
        identificationNumber: data.identificationNumber,
        identificationTypeId: data.identificationTypeId,
        lastName: data.lastName,
        maritalStatusId: data.maritalStatusId,
        name: data.name,
        phoneNumber: data.phoneNumber,
        residenceTimeInYears: data.residenceTimeInYears,
        residenceTypeId: data.residenceTypeId,
        secondLastName: data.secondLastName,
        secondName: data.secondName,
        socialStratumId: data.socialStratumId,
      }))
      setDefaultFinancialAndLaborInfo({
        totalMonthlyIncome: applicantDetail.totalMonthlyIncome,
        ...applicantDetail.applicantWork,
      })
      setDefaultPepsInfo({
        isPublicServant: applicantDetail.isPublicServant,
        ...(applicantDetail.isPublicServant && {
          publiclyExposedPerson: {
            ...applicantDetail.publiclyExposedPerson,
            unbundlingDate: applicantDetail.publiclyExposedPerson?.unbundlingDate?.split('T')[0],
          },
        }),
      })
      setDefaultForeignProducts({
        hasInternationalAccount: applicantDetail.hasInternationalAccount,
        internationalAccount: applicantDetail.internationalAccount,
        hasInternationalBusiness: applicantDetail.hasInternationalBusiness,
        internationalBusiness: applicantDetail.internationalBusiness,
        hasInternationalPatrimony: applicantDetail.hasInternationalPatrimony,
        internationalPatrimony: applicantDetail.internationalPatrimony,
      })
      setDefaultGoodsAndVehicles({
        goods: goods ?? [],
        vehicles: applicantVehicles ?? [],
      })
      setDefaultReferences({
        references: references ?? [],
      })
    } catch (error) {
    } finally {
      steps.nextStep()
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }

    handleSuccess()
  }, [references])

  useEffect(() => {
    if (isVerified) {
      getVerificationData()
    }
  }, [isVerified])

  return {
    isLoading,
    personalInfo,
    financialAndLaborInfo,
    pepsInfo,
    references,
    foreignProducts,
    goodsAndVehicles,
    defaultFinancialAndLaborInfo,
    defaultForeignProducts,
    defaultGoodsAndVehicles,
    defaultPepsInfo,
    defaultPersonalInfo,
    defaultReferences,
    setPersonalInfo,
    setFinancialAndLaborInfo,
    setPepsInfo,
    setReferences,
    setForeignProducts,
    setGoodsAndVehicles,
    getVerificationData,
    ...steps,
  }
}
