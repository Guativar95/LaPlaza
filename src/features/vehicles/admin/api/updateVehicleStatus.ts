import { inventoryApi } from '@/api/inventoryApi'

export interface vehicleStatus {
  vehicleId: string
  statusVehicleId: number
}

export const updateVehicleStatus = (data: vehicleStatus) => {
  return inventoryApi.post('/Vehicle/UpdateVehicleStatus', data)
}
