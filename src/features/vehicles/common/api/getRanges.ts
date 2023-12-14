import { inventoryApi } from '@/api/inventoryApi'

import { Range } from '../types'

export const getMileageRange = () => {
  return inventoryApi.get<Range>('/Vehicle/GetRangeMileage')
}

export const getMonthlyFeeRange = () => {
  return inventoryApi.get<Range>('/Vehicle/GetRangePrice')
}
