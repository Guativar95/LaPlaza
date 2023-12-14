import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { Vehicle } from '@vehicles/common'

import { MainLayout } from '@/components/Layout'
import { LinkButton } from '@/components/ui/Button'
import { Column, Table } from '@/components/ui/Table'
import { useApiPagination } from '@/hooks/useApiPagination'
import { Params } from '@/utils/url'

import { getVehiclesByFilters } from '../../common/api/getVehicles'

export const InventoryPage = () => {
  const columns = useMemo<Column<Vehicle>[]>(
    () => [
      { name: 'dateEntry', formatAs: 'date', label: 'Fecha creación' },
      { name: 'licencePlate', label: 'Placa' },
      { name: 'brand', label: 'Marca' },
      { name: 'statusVehicle', label: 'Estado' },
      {
        name: 'vehicleId',
        label: '',
        render: ({ value }) => <LinkButton to={String(value)}>Gestionar</LinkButton>,
      },
    ],
    []
  )

  const fetchDataFn = async (params: Params) => {
    const { data } = await getVehiclesByFilters(params)
    return data
  }

  const { items, pagination, isFetching } = useApiPagination({
    fetchDataFn,
    pageSize: 6,
  })

  return (
    <MainLayout title='Inventario'>
      <Table
        columns={columns}
        data={items}
        bodyClassName='bg-white'
        isLoading={isFetching}
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

      <Outlet />
    </MainLayout>
  )
}
