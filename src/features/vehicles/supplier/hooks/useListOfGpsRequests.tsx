import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Column } from '@/components/ui/Table'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'
import { useAuth } from '@/lib/auth'

import { RequestFiltersValues } from '../../admin/components/RequestFiltersForm'
import { RequestResponse, RequestTypes, StatusVehicle } from '../../common'
import { getRequests } from '../../common/api/getRequests'

import { SimpleRequest } from './useRequestsList'

export type UseListOfGpsRequests = {
  requestType: RequestTypes.activeGPS | RequestTypes.inactiveGPS
}

export const useListOfGpsRequests = ({ requestType }: UseListOfGpsRequests) => {
  const { user } = useAuth()

  const [selectedConfirm, setSelectedConfirm] = useState<RequestResponse | null>(null)

  const fetchDataFn = async (params: FetchDataProps) => {
    const { data } = await getRequests({
      ...params,
      providerId: user?.userId!,
      typeRequestId: requestType,
    })

    return data
  }

  const { filters, items, pagination, isFetching, reloadData } = useApiPagination<RequestResponse>({
    fetchDataFn,
    pageSize: 5,
  })

  const mappedItems = useMemo<SimpleRequest[]>(
    () =>
      items.map(
        ({ licencePlate, brand, statusRequest, location, id, statusRequestId, scheduledDate }) => ({
          id,
          licencePlate,
          brand,
          status: statusRequest,
          location,
          statusId: statusRequestId,
          scheduledDate,
        })
      ),
    [items]
  )

  const columns = useMemo<Column<SimpleRequest>[]>(
    () => [
      {
        name: 'createdAt',
        label: 'Fecha solicitud',
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
        name: 'status',
        label: 'Estado',
      },
      {
        name: 'id',
        label: '',
        render({ index }) {
          const request = items[index]
          if (!request) return null

          const isDisabled = request.statusRequestId !== StatusVehicle.pending
          return (
            <Button disabled={isDisabled} onClick={() => setSelectedConfirm(request)}>
              Confirmar
            </Button>
          )
        },
      },
    ],
    [items]
  )

  const handleFilters = (values: RequestFiltersValues) => {
    Object.entries(values).forEach(([key, value]) => {
      filters.add(key, value)
    })
  }

  return {
    isFetching,
    reloadData,
    pagination,
    columns,
    selectedConfirm,
    setSelectedConfirm,
    handleFilters,
    items: mappedItems,
  }
}
