import { creditApi } from '@/api/creditApi'

export interface SendOTPsDTO {
  requestCode: string
  email: string
  phoneNumber: string
}

export const sendOTPs = (data: SendOTPsDTO) => {
  return creditApi.post<number>('/otps/GenerateAndSendOTPCode', data)
}
