import { creditApi } from '@/api/creditApi'

export interface ContinueRegisterGuarantorDTO {
  questionnaireId: number
  questionnaireReg: string
  answers: { questionId: string; answerId: string }[]
  requestCode: string
  guarantorId: number
}

export const continueRegisterGuarantor = (data: ContinueRegisterGuarantorDTO) => {
  return creditApi.post<number>('/guarantors/continueGuarantorCreation', data)
}
