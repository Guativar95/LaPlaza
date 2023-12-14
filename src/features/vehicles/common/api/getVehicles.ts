import { inventoryApi } from '@/api/inventoryApi'
import { Params } from '@/utils/url'

import { VehiclesResponse } from '../types'

export const getVehiclesByFilters = (params: Params = {}) => {
  return inventoryApi.get<VehiclesResponse>('/Vehicle/GetVehiclesByFilters', { params })
}
