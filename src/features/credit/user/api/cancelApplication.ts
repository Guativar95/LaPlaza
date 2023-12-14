import { creditApi } from '@/api/creditApi'

export interface CancelApplicationDTO {
  code: string
}

export const cancelApplication = (data: CancelApplicationDTO) => {
  return creditApi.put('/requests/cancelRequest', data)
}
