import { inventoryApi } from '@/api/inventoryApi'

import { Vehicle } from '../types'

export const getVehicleById = (id: string) => {
  return inventoryApi.get<Vehicle>(`/vehicle/${id}`)
}
