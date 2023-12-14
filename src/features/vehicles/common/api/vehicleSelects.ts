import { inventoryApi } from '@/api/inventoryApi'
import { selectsApi } from '@/api/selectsApi'

import { SelectInventory, SelectInventoryParams, SelectMasterService } from '../types'

export const getOrigins = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllOrigins')
}

export const getConditions = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllConditions')
}

export const getBodyworkTypes = (params?: SelectInventoryParams) => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllTypeBodyworks', { params })
}

export const getStatus = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllStatusVehicles')
}

export const getTransmissionTypes = (params?: SelectInventoryParams) => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllTypeTransmissions', { params })
}

export const getTractionTypes = (params?: SelectInventoryParams) => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllTypeTractions', { params })
}

export const getFuelTypes = (params?: SelectInventoryParams) => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllTypeFuels', { params })
}

export const getOffices = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllOffices')
}

export const getInventoryBrands = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllBrands')
}
export const getInventoryClasses = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllClasses')
}
export const getInventoryModels = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllModels')
}

export const getServices = () => {
  return inventoryApi.get<SelectInventory[]>('/Vehicle/GetAllServices')
}

export const getBrands = () => {
  return selectsApi.get<SelectMasterService[]>('/VehicleBrand')
}

export const getClassesByBrandId = (brandId: string) => {
  return selectsApi.get<SelectMasterService[]>('/VehicleClass', { params: { brandId } })
}

export const getLinesByBrandIdAndClassId = (brandId: string, classId: string) => {
  return selectsApi.get<SelectMasterService[]>(`/VehicleType/${classId}/${brandId}`)
}

export const getModelsByLineId = (lineId: string) => {
  return selectsApi.get<SelectMasterService[]>(`/VehicleModel/${lineId}`)
}

export const getinsurancePercentages = () => {
  return inventoryApi.get<{ percent: number }[]>('/vehicle/GetAllPercents')
}
export const getFasecolda = (fasecoldaCode: string) => {
  return selectsApi.get<SelectMasterService>(`/VehicleType/${fasecoldaCode}`)
}
