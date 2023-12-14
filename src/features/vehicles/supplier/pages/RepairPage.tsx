import { useMemo } from 'react'
import { RequestFiltersForm } from '@vehicles/admin/components/RequestFiltersForm'
import { RequestTypes } from '@vehicles/common'

import { MainLayout } from '@/components/Layout'
import { LinkButton } from '@/components/ui/Button'
import { Column, Table } from '@/components/ui/Table'

import { SimpleRequest, useRequestsList } from '../hooks/useRequestsList'

export const RepairPage = () => {
  const { commonColumns, handleFilters, mappedItems, isFetching, pagination } = useRequestsList({
    requestType: RequestTypes.repair,
  })

  const columns = useMemo<Column<SimpleRequest>[]>(
    () => [
      ...commonColumns,
      {
        name: 'id',
        label: '',
        render: ({ value }) => <LinkButton to={String(value)}>Gestionar</LinkButton>,
      },
    ],
    []
  )

  return (
    <MainLayout title='Reparaciones'>
      <h1 className='text-2xl text-secondary font-bold'>Reparaciones</h1>
      <div className='mb-3'>
        <RequestFiltersForm onSuccess={handleFilters} statusType='repairs' />
      </div>
      <Table
        columns={columns}
        data={mappedItems}
        pagination={{
          currentPage: pagination.pageIndex,
          nextPage: pagination.nextPage,
          prevPage: pagination.prevPage,
          totalPages: pagination.pageCount,
          isFirstPage: pagination.isFirstPage,
          isLastPage: pagination.isLastPage,
          isLoading: isFetching,
        }}
      />
    </MainLayout>
  )
}
