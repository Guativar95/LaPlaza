export type Params = {
  [key: string]: string | number | boolean | undefined | null
}

export const buildUrl = (uri: string, params: Params = {}) => {
  const query = buildParams(params)

  return `${uri}${query ? `?${query}` : ''}`
}

export const buildParams = (params: Params = {}) => {
  const esc = encodeURIComponent
  const query = Object.keys(params)
    .map((key) => `${esc(key)}=${esc(params[key] || '')}`)
    .join('&')

  return query
}
