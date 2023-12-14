import { PaginationResponse } from '@/types'

export type SimpleApplication = {
  code: string
  requestStatus: string
  createdDate: string
  deliveryDate: string
  vehicleId: string
  brand: string
  line: string
  licencePlate: string
}

export interface ApplicationsResponse extends PaginationResponse<SimpleApplication> {}
