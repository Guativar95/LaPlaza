import { inventoryApi } from '@/api/inventoryApi'

import { VehicleImage } from '../types'

export const getImagesByVehicleId = (id: string) => {
  return inventoryApi.get<VehicleImage[]>(`/Image/${id}`)
}
