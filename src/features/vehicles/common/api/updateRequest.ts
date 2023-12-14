import { inventoryApi } from '@/api/inventoryApi'
import { PartialBy } from '@/types'

import { DetailRequest, DetailRequestTax, Observation, RequestResponse } from '../types'

export type DetailRequestDTO = Omit<DetailRequest, 'observations' | 'taxes'> & {
  taxes?: PartialBy<DetailRequestTax, 'name' | 'id'>[]
} & {
  observations: PartialBy<Observation, 'id' | 'status'>[]
}

export interface UpdateRequestDTO
  extends PartialBy<
    Omit<RequestResponse, 'detailRequests' | 'scheduledDate'>,
    | 'typeVisit'
    | 'location'
    | 'vehicleId'
    | 'status'
    | 'licencePlate'
    | 'brand'
    | 'provider'
    | 'statusRequestId'
    | 'statusRequest'
  > {
  scheduledDate?: Date | string
  detailRequests?: DetailRequestDTO[]
}

export const updateRequest = (data: UpdateRequestDTO) => {
  data.detailRequests ??= []
  data.detailRequests = data.detailRequests.map((detail) => ({ ...detail, typeEstimate: null }))

  return inventoryApi.post('/Request/UpdateRequest', data)
}
