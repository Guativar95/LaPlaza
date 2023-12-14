import Axios, { AxiosRequestConfig } from 'axios'

import { INVENTORY_API_URL } from '@/config'
import storage from '@/utils/storage'

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken()
  if (!config.headers) config.headers = {}
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'
  return config
}

export const axios = Axios.create({
  baseURL: INVENTORY_API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
// TODO: check response interceptor to error notifications
