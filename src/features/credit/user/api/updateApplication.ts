import { CreditResponse } from '@credit/common'

import { creditApi } from '@/api/creditApi'

export interface UpdateInitialPaymentDTO {
  requestCode: string
  initialPayment: number
}

export interface UpdateRequestedVehicleDTO {
  requestCode: string
  newVehicleId: string
}

export interface UpdateTermAndFee {
  requestCode: string
  chosenTerm: number
  chosenAmount: number
}

export const updateInitialPayment = (data: UpdateInitialPaymentDTO) => {
  return creditApi.put<CreditResponse>('/requests/updateInitialPayment', data)
}

export const updateRequestedVehicle = (data: UpdateRequestedVehicleDTO) => {
  return creditApi.put<CreditResponse>('/requests/updateRequestedVehicle', data)
}

export const updateTermAndFee = (data: UpdateTermAndFee) => {
  return creditApi.put('/requests/updateTermAndFee', data)
}
