import { inventoryApi } from '@/api/inventoryApi'

export interface CreateEstimateDTO {
  name: string
}

export const createEstimate = (data: CreateEstimateDTO) => {
  return inventoryApi.post('/Vehicle/CreateTypeEstimate', data)
}
