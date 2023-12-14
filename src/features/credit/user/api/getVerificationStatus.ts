import { creditApi } from '@/api/creditApi'

import { VerificationStatus } from '../types'

export const getVerificationStatusById = (id: string, params?: Record<string, unknown>) => {
  return creditApi.get<VerificationStatus>(`/webhooks/metamap/${id}`, {
    params,
  })
}
