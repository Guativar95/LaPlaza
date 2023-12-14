import { inventoryApi } from '@/api/inventoryApi'

import { SelectInventory } from '../types'

export const getVisitTypes = () => {
  return inventoryApi.get<SelectInventory[]>('/Request/GetTypeVisits')
}
