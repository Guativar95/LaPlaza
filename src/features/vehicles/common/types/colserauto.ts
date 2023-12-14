export interface CalculatedTerm {
  grossValue: number
  initialFee: number
  remaining: number
  term: number
  monthlyFee: number
  realValue: number
  rate: number
  rateId: string
  addValues: number
  insuraceFinancialProtection: number
  accidentInsurance: number
  lifeInsurance: number
  unlimitedWashes: number
  addPercentInsuranceVH: number
  vhInsurance: number
}

export enum Type {
  Bool = 'bool',
  Numeric = 'numeric',
  String = 'string',
  Select = 'select',
}

export interface ColserautoField {
  id: number
  name: string
  type: Type
}

export interface ColserautoValue {
  colserautoId: number
  vehicleId: string
  name: string
  value: string
  actual: String
}

export interface ColserautoVehicle {
  colserautoId: number
  vehicleId: string
  value?: string
  actual?: String
}
