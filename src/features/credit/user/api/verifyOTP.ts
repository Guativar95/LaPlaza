import { creditApi } from '@/api/creditApi'

interface VerifyOTPsDTO {
  otpCodeId: number
  emailCode: string
  smsCode: string
}

export const verifyOTPs = (data: VerifyOTPsDTO) => {
  return creditApi.post<boolean>('/otps/VerifyOTPCode', data)
}
