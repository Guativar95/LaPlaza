import { ColserautoVehicle } from '@vehicles/common'

import { inventoryApi } from '@/api/inventoryApi'

export interface CreateConserautoVehicleDTO {
  colserautoVehicles: ColserautoVehicle[]
}

export const createColserautoVehicle = (data: CreateConserautoVehicleDTO) => {
  return inventoryApi.post('/Colserauto/CreateColserautoVehicle', data)
}
