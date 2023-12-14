import Axios from 'axios'

import { CREDIT_API_KEY, CREDIT_API_URL } from '@/config'

export const creditApi = Axios.create({
  baseURL: CREDIT_API_URL,
  headers: {
    'x-api-key': CREDIT_API_KEY,
  },
})
