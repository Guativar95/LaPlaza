import { ColserautoVehicle } from '@vehicles/common'

import { inventoryApi } from '@/api/inventoryApi'

export interface CreateConserautoVehicleDTO {
  colserautoVehicles: ColserautoVehicle[]
}

export const updateColserautoVehicle = (data: CreateConserautoVehicleDTO) => {
  return inventoryApi.post('/Colserauto/UpdateColserautoVehicle', data)
}
