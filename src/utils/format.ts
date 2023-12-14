const locale = 'es-CO'

export const formatCurrency = (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
    ...options,
  }).format(value)

export const formatNumber = (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    ...options,
  }).format(value)

export const formatMileage = (value: number | bigint, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat(locale, options).format(value)

export const normalizeText = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
