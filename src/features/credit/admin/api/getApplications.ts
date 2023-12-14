import { creditApi } from '@/api/creditApi'
import { Params } from '@/utils/url'

import { ApplicationsResponse } from '../types'

export const getApplications = (params?: Params) => {
  return creditApi.get<ApplicationsResponse>('/requests/byLicencePlate', { params })
}
