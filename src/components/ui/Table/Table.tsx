import clsx from 'clsx'
import { Table as FTable } from 'flowbite-react'

import { RequestStatusBadge } from '@/features/vehicles/common/components/RequestStatusBadge'
import { formatCurrency } from '@/utils/format'

import { PaginationFooter, PaginationFooterProps } from '../Pagination'

import { Column, ColumnProps, DefaultFormatter, Item, ItemValue } from './types'

export type TableProps<T extends Item> = {
  data: T[]
  columns: Column<T>[]
  className?: string
  headClassName?: string
  bodyClassName?: string
  rowClassName?: string
  isLoading?: boolean
  pagination?: PaginationFooterProps
}

export const Table = <T extends Item>({
  data: items,
  columns,
  pagination,
  className,
  headClassName,
  bodyClassName,
  rowClassName,
}: TableProps<T>) => {
  const defaultFormats: DefaultFormatter = {
    currency: (val) => (!isNaN(Number(val)) ? formatCurrency(Number(val)) : ''),
    datetime: (val) => (val ? new Date(String(val)).toLocaleString() : ''),
    date: (val) => (val ? new Date(String(val)).toLocaleDateString() : ''),
    time: (val) => (val ? new Date(String(val)).toLocaleTimeString() : ''),
  }

  const renderHeadCell = (col: Column<T>) => {
    return typeof col === 'object' ? col.label ?? String(col.name) : String(col)
  }

  const renderBodyCell = ({
    col,
    row,
    value,
    index,
  }: {
    col: Column<T>
    value: ItemValue
    row: T
    index: number
  }) => {
    if (typeof col !== 'object') return value
    if (col.render) return col.render({ value, row, index })
    if (col.formatAs) return defaultFormats[col.formatAs](value)

    return value
  }

  return (
    <>
      <FTable className={className}>
        <FTable.Head className={headClassName}>
          {columns.map((col, i) => {
            const colAsObject = typeof col === 'object' ? col : ({} as ColumnProps<T>)
            const { headCellClassName } = colAsObject

            return (
              <FTable.HeadCell key={i} className={headCellClassName}>
                {renderHeadCell(col)}
              </FTable.HeadCell>
            )
          })}
        </FTable.Head>
        <FTable.Body className={clsx('bg-white', bodyClassName)}>
          {items.map((row, i) => (
            <FTable.Row key={i} className={rowClassName}>
              {columns.map((col, j) => {
                const key = typeof col === 'object' ? String(col.name) : String(col)
                const colAsObject = typeof col === 'object' ? col : ({} as ColumnProps<T>)
                const { bodyCellClassName } = colAsObject
                return (
                  <FTable.Cell key={`${key}_${j}`} className={bodyCellClassName}>
                    {typeof col === 'object' && col.label === 'Estado' ? (
                      <div className='inline-block'>
                        <RequestStatusBadge
                          status={typeof row.statusId === 'number' ? row.statusId : 0}
                        >
                          {renderBodyCell({
                            col,
                            row,
                            value: row[key],
                            index: i,
                          })}
                        </RequestStatusBadge>
                      </div>
                    ) : (
                      renderBodyCell({
                        col,
                        row,
                        value: row[key],
                        index: i,
                      })
                    )}
                  </FTable.Cell>
                )
              })}
            </FTable.Row>
          ))}
        </FTable.Body>
      </FTable>
      {pagination && (
        <div className='flex justify-center mt-2'>
          <PaginationFooter {...pagination} />
        </div>
      )}
    </>
  )
}
