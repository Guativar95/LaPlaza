import { inventoryApi } from '@/api/inventoryApi'

export interface CreateVehicleDTO {
  codeFasecolda: string
  licencePlate: string
  modelId: string
  model: string
  serviceId: number
  brandId: string
  brand: string
  chassisNumber: string
  originId: number
  classId: string
  class: string
  engine: string
  dateEntry: string
  lineId: number
  line: string
  mainColor: string
  secondaryColor: string
  conditionId: number
  grossValue: number
  urlQR: string
  typeFuelId: number
  officeId: number
  typeBodyworkId: number
  mileage: string
  description: string
  typeTransmissionId: number
  distplacement: string
  serie: string
  doors: number
  capacity: number
  vinNumber: string
  cityCode: string
}

export const createVehicle = (vehicle: CreateVehicleDTO) => {
  return inventoryApi.post<string>('/Vehicle/CreateVehicle', vehicle)
}
