import { UserRequestType } from '@vehicles/common/types'

import { inventoryApi } from '@/api/inventoryApi'

export const getUserRequestTypes = (userId: string) => {
  return inventoryApi.get<UserRequestType[]>('/Request/GetUserTypeRequests', {
    params: {
      UserId: userId,
    },
  })
}
