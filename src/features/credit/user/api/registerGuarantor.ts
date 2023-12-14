import { Applicant, VerificationData } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export interface RegisterGuarantorDTO {
  requestCode: string
  guarantorData: Applicant
  guarantorId: number
}

export const registerGuarantor = (data: RegisterGuarantorDTO) => {
  return creditApi.post<number | VerificationData>('/guarantors/addGuarantorToRequest', data)
}
