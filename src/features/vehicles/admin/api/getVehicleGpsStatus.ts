import { inventoryApi } from '@/api/inventoryApi'

import { SelectInventory } from '../../common'

interface GetVehicleGpsStatusParams {
  vehicleId: string
}

export const getVehicleGpsStatus = (params: GetVehicleGpsStatusParams) => {
  return inventoryApi.get<SelectInventory>('/Request/GetStatusRequestGPS', { params })
}
