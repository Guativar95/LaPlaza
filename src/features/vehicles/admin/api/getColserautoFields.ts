import { ColserautoField } from '@vehicles/common/types'

import { inventoryApi } from '@/api/inventoryApi'

export const getColserautoFields = () => {
  return inventoryApi.get<ColserautoField[]>('/Colserauto/GetAllColserautos')
}
