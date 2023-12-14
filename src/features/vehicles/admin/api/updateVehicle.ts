import { inventoryApi } from '@/api/inventoryApi'

export interface UpdateVehicleDTO {
  vehicleId: string
  codeFasecolda?: string
  licencePlate?: string
  modelId?: string
  model?: string
  serviceId?: number
  brandId?: string
  brand?: string
  chassisNumber?: string
  originId?: number
  classId?: string
  class?: string
  engine?: string
  dateEntry?: string
  lineId?: number
  line?: string
  mainColor?: string
  secondaryColor?: string
  conditionId?: number
  grossValue?: number
  interest?: number
  term?: number
  statusVehicleId?: number
  urlQR?: string
  typeFuelId?: number
  officeId?: number
  typeBodyworkId?: number
  mileage?: string
  description?: string
  typeTransmissionId?: number
  typeTractionId?: number
  serie?: string
  vinNumber?: string
  vhInsurance?: number
  basicMaintenance?: number
  activeGPS?: boolean | null
}

export const updateVehicle = (data: UpdateVehicleDTO) => {
  return inventoryApi.post('/Vehicle/UpdateVehicle', data)
}
