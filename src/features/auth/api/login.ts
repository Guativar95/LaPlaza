import { axios } from '@/lib/axios'

import { AuthResponse } from '../types'

export interface LoginCredentialDTO {
  identificationNumber: string
  password: string
}

export const loginWithIndentificationAndPassword = (data: LoginCredentialDTO) => {
  return axios.post<AuthResponse>('/Account/Login', data)
}
