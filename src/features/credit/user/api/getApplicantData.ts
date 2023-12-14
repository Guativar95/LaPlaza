import { Applicant } from '@credit/common'

import { creditApi } from '@/api/creditApi'

import { ApplicantData } from '../types'

export const getApplicantDataByApplicationId = (applicationId: string, guarantorId?: number) => {
  return creditApi.get<ApplicantData>(`/webhooks/metamap/applicant/${applicationId}`, {
    params: { guarantorId },
  })
}

export const getApplicantDataByIdentification = (identificationNumber: string) => {
  return creditApi.get<Applicant>(`/applicants/${identificationNumber}`)
}
