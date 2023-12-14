import Axios from 'axios'

import { SELECTS_API_TOKEN, SELECTS_API_URL } from '@/config'

export const selectsApi = Axios.create({
  baseURL: SELECTS_API_URL,
  headers: {
    'x-api-key': SELECTS_API_TOKEN,
  },
})
