import { creditApi } from '@/api/creditApi'

export type ResendOtpDTO =
  | {
      requestCode: string
      email: string
    }
  | {
      requestCode: string
      phoneNumber: string
    }

export const resendOTP = (data: ResendOtpDTO) => {
  return creditApi.post<number>('/otps/resendOTPCode', data)
}
