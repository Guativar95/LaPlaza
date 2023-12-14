import { InventoryImage, PaginationResponse } from '@/types'
export type Vehicle = {
  vehicleId: string
  codeFasecolda: string
  licencePlate: string
  licencePlatePair: boolean
  modelId: string
  model: string
  serviceId: number
  service: string
  brandId: string
  brand: string
  chassisNumber: string
  originId: number
  origin: string
  classId: string
  class: string
  engine: string
  dateEntry: string
  lineId: number
  line: string
  cityName: string
  mainColor: string
  secondaryColor: string
  conditionId: number
  condition: string
  grossValue: number
  grossValueInitial: number
  realValue: number
  initialFee: number
  discount: number
  statusVehicleId: number
  statusVehicle: string
  urlQR: string
  typeFuelId: number
  typeFuel: string
  officeId: number
  office: string
  typeBodyworkId: number
  typeBodywork: string
  mileage: string
  description: string
  typeTransmissionId: number
  typeTransmission: string
  typeTractionId: number
  typeTraction: string
  distplacement: string
  serie: string
  doors: number
  capacity: number
  vinNumber: string
  routeImageMain: string
  vhInsurance: number
  basicMaintenance: number
  cityCode: string
  addPercentInsuranceVH: number
  monthlyFee: number
  activeGPS: boolean | null
}

export interface VehiclesResponse extends PaginationResponse<Vehicle> {}

export type VehiclePreview = Pick<
  Vehicle,
  | 'vehicleId'
  | 'brand'
  | 'model'
  | 'line'
  | 'mileage'
  | 'licencePlate'
  | 'routeImageMain'
  | 'typeTransmission'
  | 'licencePlatePair'
  | 'statusVehicleId'
> & {
  fee: number
  value: number
}

export interface VehicleImage extends InventoryImage {}

export enum StatusVehicle {
  toBePublished = 1,
  available = 2,
  inProcess = 3,
  purchased = 4,
  inCleaning = 5,
  installiGps = 6,
  inEnlistment = 7,
  inPreparation = 8,
  reserved = 9,
  inShowcase = 10,
  pending = 12,
  scheduled = 13,
  completed = 14,
  pendingQuotation = 15,
  agendaQuotation = 16,
  quoted = 17,
  rejected = 18,
  gpsActivation = 19,
  gpsInactivation = 20,
}

export enum VehicleGpsStatus {
  ActivationProcess = 'activationProcess',
  InactivationProcess = 'inactivationProcess',
  Active = 'active',
  Inactive = 'inactive',
  GPSNoInstalled = 'GPSNoInstalled',
}
