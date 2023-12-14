export const BASE_URL = import.meta.env.VITE_BASE_APP_URL as string

export const INVENTORY_API_URL = import.meta.env.VITE_INVENTORY_API_URL as string
export const INVENTORY_API_KEY = import.meta.env.VITE_INVENTORY_API_KEY as string

export const CREDIT_API_URL = import.meta.env.VITE_CREDIT_API_URL as string
export const CREDIT_API_KEY = import.meta.env.VITE_CREDIT_API_KEY as string

export const SELECTS_API_URL = import.meta.env.VITE_SELECTS_API_URL as string
export const SELECTS_API_TOKEN = import.meta.env.VITE_SELECTS_API_TOKEN as string

export const MATI_CLIENT_ID = import.meta.env.VITE_MATI_CLIENT_ID as string
export const MATI_FLOW_ID = import.meta.env.VITE_MATI_FLOW_ID as string

export const AUTO_REFRESH_INTERVAL =
  (import.meta.env.VITE_AUTO_REFRESH_INTERVAL_MIN || 5) * 60 * 1000
export const IDLE_TIMEOUT = (import.meta.env.VITE_IDLE_TIMEOUT_MIN || 30) * 60 * 1000

export const STORAGE_PREFIX = 'carfiao_'
