import { inventoryApi } from '@/api/inventoryApi'

import { CalculatedTerm } from '../types'

export interface CalculateTermDTO {
  initialFee: number
  term: number
  vehicleId: string
}

export const calculateTerm = (data: CalculateTermDTO) => {
  return inventoryApi.post<CalculatedTerm>('/Vehicle/GetVehiclePriceCalculator', data)
}
