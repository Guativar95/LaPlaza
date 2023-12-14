import { CreditResponse } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export interface CallScoreWithGuarantorsDTO {
  requestCode: string
}

export const callScoreWithGuarantors = (data: CallScoreWithGuarantorsDTO) => {
  return creditApi.post<CreditResponse>('/requests/callScoreWithGuarantors', data)
}
