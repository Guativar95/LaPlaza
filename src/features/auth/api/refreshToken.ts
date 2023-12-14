import { axios } from '@/lib/axios'

import { AuthResponse } from '../types'

export interface RefreshCredentialDTO {
  token: string
  refreshToken: string
}

export const refreshTokenWithTokenAndRefreshToken = (data: RefreshCredentialDTO) => {
  return axios.post<AuthResponse>('/Account/RefreshToken', data)
}
