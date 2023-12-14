import { InventoryImage, PaginationResponse } from '@/types'

export interface Observation {
  id: number
  value: string
  statusVehicleId: number
  status: string
  detailRequestId: number
}

export interface DetailRequestTax {
  id: number
  taxId: number
  detailRequestId: number
  name: string
  value: number
}

export interface DetailRequest {
  id?: number
  requestId?: number
  typeEstimateId?: number
  typeEstimate?: string | null
  description: string
  value?: number
  acepted?: boolean
  createdDate?: string
  observations: Observation[]
  startDate?: string
  endDate?: string
  images?: InventoryImage[]
  taxes?: DetailRequestTax[]
}

export interface Request {
  vehicleId: string
  statusVehicleId: number
  typeRequestId: number
  statusRequestId: number
  scheduledDescription?: string
  typeVisitId?: number
  scheduledDate?: string
  providerId?: string
  location?: string
  total?: number
  detailRequests: DetailRequest[]
}

export enum RequestTypes {
  repair = 1,
  cleaning = 2,
  enlistment = 3,
  gps = 4,
  activeGPS = 5,
  inactiveGPS = 6,
}

export interface RequestResponse extends Request {
  id: number
  licencePlate: string
  brand: string
  status: string
  statusRequest: string
  provider: string
  typeVisit: string
}

export interface UserRequestType {
  id: number
  userId: string
  userName: string
  typeRequestId: number
  typeRequest: string
  active: boolean
}

export interface RequestsResponse extends PaginationResponse<RequestResponse> {}
