import { inventoryApi } from '@/api/inventoryApi'

import { ColserautoValue } from '../types'

export const getColserautoValuesByVehicleId = (id: string) => {
  return inventoryApi.get<ColserautoValue[]>(`/Colserauto/GetColserautosByVehicleId`, {
    params: { VehicleId: id },
  })
}
