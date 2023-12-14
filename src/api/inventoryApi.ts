import Axios, { AxiosRequestConfig } from 'axios'

import { INVENTORY_API_KEY, INVENTORY_API_URL } from '@/config'
import storage from '@/utils/storage'

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken()
  if (!config.headers) config.headers = {}
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.apiKey = INVENTORY_API_KEY
  config.headers.Accept = 'application/json'
  return config
}

export const inventoryApi = Axios.create({
  baseURL: INVENTORY_API_URL,
})

inventoryApi.interceptors.request.use(authRequestInterceptor)
// TODO: check response interceptor to error notifications
