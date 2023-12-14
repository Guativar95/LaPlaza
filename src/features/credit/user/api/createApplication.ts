import { Application, CreditResponse } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export const createApplication = (data: Application) => {
  return creditApi.post<CreditResponse>('/requests', data)
}
