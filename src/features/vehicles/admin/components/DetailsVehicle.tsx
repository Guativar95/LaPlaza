import { getVehiclesByFilters } from '@vehicles/common/api/getVehicles'
import { Vehicle } from '@vehicles/common/types'

import { Spinner } from '@/components/ui/Spinner'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'

import { RequestFiltersForm, RequestFiltersValues } from './RequestFiltersForm'
import { VehiclesList } from './VehiclesList'
import { VehiclesPagination } from './VehiclesPagination'

export const DetailsVehicle = () => {
  const fetchDataFn = async (params: FetchDataProps) => {
    const { data: res } = await getVehiclesByFilters(params)
    const { pageIndex, pageCount, count, data } = res

    return {
      data,
      pageCount,
      pageIndex,
      count,
    }
  }

  const { isInitialFetching, isFetching, items, pagination, filters } = useApiPagination<Vehicle>({
    fetchDataFn,
    pageSize: 7,
  })

  const handleFilters = (values: RequestFiltersValues) => {
    filters.add('licencePlate', values.licencePlate)
    filters.add('statusVehicleId', values.statusId)
  }

  const hasResults = pagination.count > 0

  return (
    <div className='text-center max-w-4xl mx-auto'>
      <h1 className='text-left text-2xl text-primary-700 font-bold'>
        Vehículos en inventario de Carfiao
      </h1>

      <RequestFiltersForm onSuccess={handleFilters} statusType='vehicles' />

      {isInitialFetching ? (
        <Spinner className='mx-auto my-1' />
      ) : (
        <>
          {hasResults ? (
            <VehiclesList vehicles={items} />
          ) : (
            <p className='text-center italic text-gray-600 py-5'>No hay vehiculos para mostrar</p>
          )}
        </>
      )}

      <div className='flex justify-center mt-5'>
        <VehiclesPagination {...pagination} isLoading={isFetching} />
      </div>
    </div>
  )
}
