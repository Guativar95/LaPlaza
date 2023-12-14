import { creditApi } from '@/api/creditApi'

import { ApplicationProgress } from '../../common'

export const saveApplicationProgress = (data: ApplicationProgress) => {
  return creditApi.post<number>('/requests/saveProgress', data)
}

export const saveApplicationProgressForAssistance = (data: ApplicationProgress) => {
  return creditApi.post<number>('/requests/askForAssistance', data)
}
