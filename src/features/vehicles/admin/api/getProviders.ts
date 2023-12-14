import { RequestTypes, UserRequestType } from '@vehicles/common/types'

import { inventoryApi } from '@/api/inventoryApi'

export const getProvidersByRequestType = (requestTypeId: RequestTypes) => {
  return inventoryApi.get<UserRequestType[]>('/Request/GetUserTypeRequests', {
    params: {
      typeRequestId: requestTypeId,
    },
  })
}
