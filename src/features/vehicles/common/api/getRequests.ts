import { inventoryApi } from '@/api/inventoryApi'
import { Params } from '@/utils/url'

import { RequestsResponse } from '../types'

export interface RequestParams extends Params {
  typeRequestId: number
}

export const getRequests = (params: RequestParams) => {
  return inventoryApi.get<RequestsResponse>(`/Request/GetRequestsByFilters`, {
    params,
  })
}
