import { inventoryApi } from '@/api/inventoryApi'

export const validatePasswordRecoveryToken = (token: string) => {
  return inventoryApi.get<string>(`/Account/ValidateTokenPasswordRecovery/${token}`)
}

export interface ResetPasswordDTO {
  resetToken: string
  newPassword: string
}

export const resetPassword = (data: ResetPasswordDTO) => {
  return inventoryApi.post<boolean>('/Account/ResetPassword', data)
}
