import { SimpleGuarantor } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export const getGuarantorsByApplicationId = (applicationId: string) => {
  return creditApi.get<SimpleGuarantor[]>(`/guarantors/getByRequestCode/${applicationId}`)
}
