import { inventoryApi } from '@/api/inventoryApi'

export interface UpdateGrossValueDTO {
  vehicleId: string
  grossValue: number
}

export const updateGrossValue = (data: UpdateGrossValueDTO) => {
  return inventoryApi.post('/Vehicle/UpdateVehicle', data)
}
