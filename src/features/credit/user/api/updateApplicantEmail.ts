import { creditApi } from '@/api/creditApi'

export interface UpdateApplicantReviewDTO {
  requestCode: string
  email: string
  vehicleId?: string
  guarantorId?: number
}

export const updateApplicantReview = (data: UpdateApplicantReviewDTO) => {
  return creditApi.post('/webhooks/metamap/review', data)
}
