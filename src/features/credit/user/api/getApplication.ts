import { creditApi } from '@/api/creditApi'

import { ApplicationProgress } from '../../common'

interface GetApplicationProcessParams {
  id: string
}
export const getApplicationProcess = ({ id }: GetApplicationProcessParams) => {
  return creditApi.get<ApplicationProgress>('/requests/getProgress', {
    params: { requestCode: id },
  })
}
