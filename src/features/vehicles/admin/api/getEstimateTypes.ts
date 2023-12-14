import { SelectInventory } from '@vehicles/common'

import { inventoryApi } from '@/api/inventoryApi'

export const getEstimateTypes = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllTypeEstimates')
}
