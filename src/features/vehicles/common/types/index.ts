export * from './request'
export * from './vehicle'
export * from './colserauto'
export * from './taxes'

export interface SelectMasterService {
  id: string
  value: string
}

export interface SelectInventoryParams {
  statusVehicleId?: number
}

export interface SelectInventory {
  id: number
  name: string
}

export interface Range {
  min: string
  max: string
}
