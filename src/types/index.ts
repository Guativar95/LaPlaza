import { ReactElement } from 'react'

import { Role } from '@/features/auth'

export * from './alert'

export interface PaginationResponse<T> {
  count: number
  pageIndex: number
  pageSize: number
  pageCount: number
  data: T[]
}

export type DefaultValuesForm<T> = {
  [key in keyof T]?: T[key]
}

export type RoleRoutes = {
  [key in Role]: ReactElement | null
}

export type FetchError<TCause = any> = {
  msg: string
  couse: TCause
}

export type InventoryConfiguration = {
  id: number
  createdDate: string
  createdBy: string
  lastModifiedDate: string
  lastModifiedBy: string
  key: string
  description: string
  value: string
}

export type InventoryImage = {
  id: number
  createdDate: string
  createdBy: string
  lastModifiedDate: string
  lastModifiedBy: string
  vehicleId: string
  name: string
  typeFile: string
  route: string
  order: number
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
