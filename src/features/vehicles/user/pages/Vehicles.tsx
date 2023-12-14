import { Vehicle } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'
import { Spinner } from '@/components/ui/Spinner'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'

import { getVehiclesByFilters } from '../../common/api/getVehicles'
import { NewVehicleFilters } from '../components/NewVehicleFilters'
import { SearchForm } from '../components/SearchForm'
import { VehiclesList } from '../components/VehiclesList'
import { VehiclesPagination } from '../components/VehiclesPagination'

export const Vehicles = () => {
  const fetchDataFn = async (params: FetchDataProps) => {
    const { data: res } = await getVehiclesByFilters({
      ...params,
      StatusVehicleIds: '9, 10',
      Sort: 'MonthlyFeeAsc',
    })

    const { pageIndex, pageCount, count, data } = res

    return {
      data: data.sort((x, y) => x.monthlyFee - y.monthlyFee),
      pageCount,
      pageIndex,
      count,
    }
  }

  const { isInitialFetching, isFetching, items, pagination, filters } = useApiPagination<Vehicle>({
    fetchDataFn,
    pageSize: 6,
  })

  const hasResults = pagination.count > 0

  return (
    <MainLayout title='Vehículos'>
      <main>
        <section>
          <SearchForm filters={filters} />
        </section>
        <div className='py-5'>
          <NewVehicleFilters filters={filters} />
        </div>
        {isInitialFetching ? (
          <Spinner className='mx-auto my-5' />
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
      </main>
    </MainLayout>
  )
}
