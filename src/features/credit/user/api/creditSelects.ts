import { SelectMasterService } from '@vehicles/common/types'

import { selectsApi } from '@/api/selectsApi'

export const getIdentificationTypes = () => {
  return selectsApi.get<SelectMasterService[]>('/IdentificationType')
}

export const getDepartments = () => {
  return selectsApi.get<SelectMasterService[]>('/Department')
}

export const getMunicipalities = () => {
  return selectsApi.get<SelectMasterService[]>('/Municipality')
}

export const getMunicipalitiesByDepartmentId = (departamentId: string) => {
  return selectsApi.get<SelectMasterService[]>('/Municipality', {
    params: { departamentId },
  })
}

export const getOccupations = () => {
  return selectsApi.get<SelectMasterService[]>('/Occupation')
}

export const getMaritalStatus = () => {
  return selectsApi.get<SelectMasterService[]>('/MaritalStatus')
}

export const getResidenceTypes = () => {
  return selectsApi.get<SelectMasterService[]>('/ResidenceType')
}

export const getProfessions = () => {
  return selectsApi.get<SelectMasterService[]>('/Profession')
}

export const getContractTypes = () => {
  return selectsApi.get<SelectMasterService[]>('/ContractType')
}

export const getInternationalBusinessTypes = () => {
  return selectsApi.get<SelectMasterService[]>('/InternationalBusiness')
}

export const getAccountTypes = () => {
  return selectsApi.get<SelectMasterService[]>('/AccountType')
}

export const getGoodTypes = () => {
  return selectsApi.get<SelectMasterService[]>('/GoodType')
}

export const getInitialPaymentOrigins = () => {
  return selectsApi.get<SelectMasterService[]>('/InitialPaymentOrigin')
}

export const getEconomicSectors = () => {
  return selectsApi.get<SelectMasterService[]>('/EconomicSector')
}

export const getEconomicClasses = (economicSectorId: string) => {
  return selectsApi.get<SelectMasterService[]>('/EconomicClass', { params: { economicSectorId } })
}
