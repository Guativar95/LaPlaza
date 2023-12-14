export interface ApplicantWork {
  professionId: string
  occupationId: string
  companyName: string
  position: string
  yearsOfService: number
  contractTypeId: string
  workAddress: string
  departmentId: string
  cityId: string
  phoneNumber: string
}

export interface InternationalAccount {
  countryId: string
  productNumber: string
  internationalProductTypeId: string
  anotherInternationalProductType: string
  entity: string
  currencyId: string
  cityId: string
  value: number
}

export interface InternationalBusiness {
  internationalBusinessTypeId: string
}

export interface InternationalPatrimony {
  countryId: string
  cityId: string
}

export interface PubliclyExposedPerson {
  organization: string
  handlesPublicResources: boolean
  position: string
  unbundlingDate?: string
}

export interface ApplicantVehicle {
  brandId: string
  classId: string
  modelId: string
  lineId: string
  tradePrice: number
}

export interface Good {
  goodTypeId: string
  price: number
}

export interface Reference {
  name: string
  lastName: string
  phoneNumber: string
  cellphoneNumber: string
  relationShip: string
}

export interface RequestedVehicle {
  vehicleId: string
}

export interface RequestDetail {
  deadline: number
  initialPayment: number
  quotaOriginId: string
  valueToFinance: number
  requestedVehicle: RequestedVehicle
}

export interface ApplicantDetail {
  totalMonthlyIncome: number
  hasInternationalBusiness: boolean
  internationalBusiness?: InternationalBusiness | null
  hasInternationalPatrimony: boolean
  internationalPatrimony?: InternationalPatrimony | null
  isPublicServant: boolean
  publiclyExposedPerson?: PubliclyExposedPerson | null
  hasInternationalAccount: boolean
  internationalAccount?: InternationalAccount | null
  applicantWork: ApplicantWork
}

export interface Applicant {
  name: string
  secondName: string
  lastName: string
  secondLastName: string
  identificationTypeId: string
  identificationNumber: string
  identificationIssuedIn: string
  expeditionDate: string
  email: string
  address: string
  cityId: string
  departmentId: string
  residenceTimeInYears: number
  socialStratumId: string
  birthDate: string
  phoneNumber: string
  residenceTypeId: string
  maritalStatusId: string
  gender: string
  dependants: number
  applicantDetail: ApplicantDetail
  applicantVehicles: ApplicantVehicle[]
  goods: Good[]
  references: Reference[]
}
