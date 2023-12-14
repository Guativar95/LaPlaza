import { CreditStatusResponse } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export const getApplicationStatus = (applicationId: string) => {
  return creditApi.get<CreditStatusResponse>(`/requests/statusByCode/${applicationId}`)
}
