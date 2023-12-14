import { SimpleGuarantor } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export interface AddGuarantorDTO extends SimpleGuarantor {
  code: string
}

export const addGuarantor = (data: AddGuarantorDTO) => {
  return creditApi.post('/guarantors/SendUrlToGuarantor', data)
}
