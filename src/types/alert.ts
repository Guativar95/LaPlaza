import { RequestTypes } from '@/features/vehicles/common'

export interface ModuleAlert {
  userSenderId: string
  userAddresseeId: string
  requestId: number
  typeRequestId: number
  isRead: boolean
}

export interface RoleAlerts {
  overallReading: boolean
  moduleAlerts: ModuleAlert[]
}

export type RequestAlerts = {
  [key in RequestTypes]: { has: boolean; count: number }
}

export interface Alerts {
  overallReading: boolean
  requests: RequestAlerts
}
