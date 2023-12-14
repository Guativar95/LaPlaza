import { STORAGE_PREFIX } from '@/config'

type CreditStorageValues = {
  fee: number
  initialPayment: number
}

const tokenKey = `${STORAGE_PREFIX}token`
const refreshTokenKey = `${STORAGE_PREFIX}refresh_token`
const creditValuesKey = `${STORAGE_PREFIX}credit_values`

const storage = {
  getToken() {
    return JSON.parse(localStorage.getItem(tokenKey) as string)
  },
  setToken(token: string) {
    localStorage.setItem(tokenKey, JSON.stringify(token))
  },
  clearToken() {
    localStorage.removeItem(tokenKey)
  },
  getRefreshToken() {
    return JSON.parse(localStorage.getItem(refreshTokenKey) as string)
  },
  setRefreshToken(refreshToken: string) {
    localStorage.setItem(refreshTokenKey, JSON.stringify(refreshToken))
  },
  clearRefreshToken() {
    localStorage.removeItem(refreshTokenKey)
  },
  getCredentials() {
    const token = this.getToken()
    const refreshToken = this.getRefreshToken()

    return { token, refreshToken }
  },
  clearCredentials() {
    this.clearToken()
    this.clearRefreshToken()
  },
  setCreditValues(values: CreditStorageValues) {
    localStorage.setItem(creditValuesKey, JSON.stringify(values))
  },
  getCreditValues(): CreditStorageValues {
    return JSON.parse(localStorage.getItem(creditValuesKey) ?? '{}')
  },
  clearCreditValues() {
    localStorage.removeItem(creditValuesKey)
  },
}

export default storage
