import { ReactNode } from 'react'

export type ItemValue = string | number | null | undefined | boolean

export type DefaultFormats = 'date' | 'datetime' | 'time' | 'currency'

export type DefaultFormatter = {
  [key in DefaultFormats]: (value: ItemValue) => string
}

export type Item = {
  [k: string]: ItemValue
}

export type ColumnProps<T extends Item> = {
  label?: string
  name: keyof T
  formatAs?: DefaultFormats
  render?: (props: { value: ItemValue; row: T; index: number }) => ReactNode
  headCellClassName?: string
  bodyCellClassName?: string
}

export type ColumnKey<T extends Item> = keyof T

export type Column<T extends Item> = ColumnProps<T> | ColumnKey<T>
