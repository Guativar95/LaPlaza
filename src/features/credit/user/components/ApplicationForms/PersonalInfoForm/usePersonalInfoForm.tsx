import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  getDepartments,
  getIdentificationTypes,
  getMaritalStatus,
  getMunicipalitiesByDepartmentId,
  getResidenceTypes,
} from '@credit/user/api/creditSelects'

import { Option } from '@/components/Form'
import { DefaultValuesForm } from '@/types'
import { mapSelectToOption } from '@/utils/maps'

import { OTPVerificationStatus, PersonalInfoValues } from './types'
import { useApplicationOtp } from './useApplicationOtp'

export type UsePersonalInfoForm = {
  applicationId: string
  onSuccess: (values: PersonalInfoValues) => void
  defaultValues?: Pick<DefaultValuesForm<PersonalInfoValues>, 'departmentId'>
}

export const usePersonalInfoForm = ({
  onSuccess,
  applicationId,
  defaultValues,
}: UsePersonalInfoForm) => {
  const otp = useApplicationOtp({ applicationId })
  const [showOtpModal, setShowOtpModal] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState({} as PersonalInfoValues)
  const [identificationTypes, setIdentificationTypes] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [municipalities, setMunicipalities] = useState<Option[]>([])
  const [maritalStatus, setMaritalStatus] = useState<Option[]>([])
  const [residenceTypes, setResidenceTypes] = useState<Option[]>([])
  const genders = useMemo<Option[]>(
    () => [
      { label: 'Masculino', value: 'M' },
      { label: 'Femenino', value: 'F' },
    ],
    []
  )
  const socialStratum = useMemo<Option[]>(
    () => [...new Array(6)].map((_, i) => ({ label: i + 1, value: i + 1 })),
    []
  )

  const getSelectsValues = async () => {
    try {
      const [identificationTypesRes, departmentsRes, maritalStatusRes, residenceTypesRes] =
        await Promise.all([
          getIdentificationTypes(),
          getDepartments(),
          getMaritalStatus(),
          getResidenceTypes(),
        ])

      setIdentificationTypes(mapSelectToOption(identificationTypesRes.data))
      setDepartments(mapSelectToOption(departmentsRes.data))
      setMaritalStatus(mapSelectToOption(maritalStatusRes.data))
      setResidenceTypes(mapSelectToOption(residenceTypesRes.data))

      if (defaultValues?.departmentId) {
        const { data } = await getMunicipalitiesByDepartmentId(defaultValues.departmentId)
        setMunicipalities(mapSelectToOption(data))
      }
    } catch (error) {
      toast.error('Hemos tenido problemas cargando las listas')
    } finally {
      setIsLoading(false)
    }
  }

  const onChangeDepartment = (val: string) => {
    if (val) {
      getMunicipalitiesByDepartmentId(val).then(({ data }) => {
        setMunicipalities(mapSelectToOption(data))
      })
    } else {
      setMunicipalities([])
    }
  }

  const upperCaseOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase()
    e.target.value = newValue
  }

  const handleSubmit = (values: PersonalInfoValues) => {
    switch (otp.verificationStatus) {
      case OTPVerificationStatus.verified:
        onSuccess(values)
        break
      default:
        otp.send({ phoneNumber: values.phoneNumber, email: values.email })
        setPersonalInfo(values)
        setShowOtpModal(true)
        break
    }
  }

  useEffect(() => {
    getSelectsValues()
  }, [])

  useEffect(() => {
    if (otp.verificationStatus === OTPVerificationStatus.verified) {
      setShowOtpModal(false)
      onSuccess(personalInfo)
    }
  }, [otp.verificationStatus])

  return {
    isLoading,
    handleSubmit,
    showOtpModal,
    identificationTypes,
    departments,
    municipalities,
    maritalStatus,
    residenceTypes,
    genders,
    socialStratum,
    upperCaseOnChange,
    onChangeDepartment,
    otp: {
      ...otp,
      isVerified: otp.verificationStatus === OTPVerificationStatus.verified,
      resendEmail: () => otp.resend({ email: personalInfo.email }),
      resendSms: () => otp.resend({ phoneNumber: personalInfo.phoneNumber }),
      reject: () => setShowOtpModal(false),
    },
  }
}
