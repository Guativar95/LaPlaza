import { CreditResponse } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export interface ContinueApplicationDTO {
  questionnaireId: number
  questionnaireReg: string
  answers: { questionId: string; answerId: string }[]
  requestCode: string
}

export const continueApplication = (data: ContinueApplicationDTO) => {
  return creditApi.post<CreditResponse>('/requests/continue', data)
}
