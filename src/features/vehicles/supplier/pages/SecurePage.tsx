import { useMemo, useState } from 'react'
import { getVehiclesByFilters } from '@vehicles/common/api/getVehicles'
import { Vehicle } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { Column, Table } from '@/components/ui/Table'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'

import { RequestFiltersForm, RequestFiltersValues } from '../../admin/components/RequestFiltersForm'
import { SecureModalSuplier } from '../../admin/components/SimpleObservationForm/SecureModalSuplier'

export const SecurePage = () => {
  const fetchDataFn = async (params: FetchDataProps) => {
    const { data } = await getVehiclesByFilters(params)
    return data
  }

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)

  const { items, pagination, isFetching, filters } = useApiPagination<Vehicle>({
    fetchDataFn,
    pageSize: 7,
  })

  const columns = useMemo<Column<Vehicle>[]>(
    () => [
      {
        name: 'dateEntry',
        label: 'Fecha ingreso',
        formatAs: 'date',
      },
      {
        name: 'licencePlate',
        label: 'Placa',
      },
      {
        name: 'brand',
        label: 'Marca',
      },
      {
        name: 'statusVehicle',
        label: 'Estado',
      },
      {
        name: 'basicMaintenance',
        formatAs: 'currency',
        label: 'Valor Plan mantenimiento',
      },
      {
        name: 'vehicleId',
        label: '',
        render: ({ value }) => (
          <Button onClick={() => setSelectedVehicleId(String(value))}>Agregar</Button>
        ),
      },
    ],
    [items]
  )

  const handleFilters = (values: RequestFiltersValues) => {
    filters.add('licencePlate', values.licencePlate)
    filters.add('statusVehicleId', values.statusId)
  }

  return (
    <MainLayout title='Plan mantenimiento'>
      <h1 className='text-left text-2xl text-primary-700 font-bold mb-3'>Vehiculos</h1>
      <div className='mb-3'>
        <RequestFiltersForm onSuccess={handleFilters} statusType='vehicles' />
      </div>

      <Table
        columns={columns}
        data={items}
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

      {selectedVehicleId && (
        <SecureModalSuplier
          setSelectedVehicleId={setSelectedVehicleId}
          vehicleId={selectedVehicleId}
          onClose={() => setSelectedVehicleId(null)}
        />
      )}
    </MainLayout>
  )
}
