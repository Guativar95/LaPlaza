import { Request } from '@vehicles/common/types'

import { inventoryApi } from '@/api/inventoryApi'

export const createRequest = (data: Request) => {
  return inventoryApi.post('/Request/CreateRequest', data)
}
