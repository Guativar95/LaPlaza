import { Taxes } from '@vehicles/common'

import { inventoryApi } from '@/api/inventoryApi'

export interface GetTaxesParams {
  addByDefault?: boolean
}

export const getTaxes = (params?: GetTaxesParams) => {
  return inventoryApi.get<Taxes[]>('/Request/GetTaxes', { params })
}
