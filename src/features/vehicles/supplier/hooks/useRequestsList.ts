import { useMemo } from 'react'

import { Column } from '@/components/ui/Table'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'
import { useAuth } from '@/lib/auth'

import { RequestFiltersValues } from '../../admin/components/RequestFiltersForm'
import { RequestResponse, RequestTypes } from '../../common'
import { getRequests } from '../../common/api/getRequests'

export type SimpleRequest = {
  id: number
  createdAt?: string
  licencePlate: string
  brand: string
  status: string
  location?: string
  description?: string
  scheduledDate?: string
}

export type UseRequestsList = {
  requestType: RequestTypes
}

export const useRequestsList = ({ requestType }: UseRequestsList) => {
  const { user } = useAuth()

  const fetchDataFn = async (params: FetchDataProps) => {
    const { data } = await getRequests({
      ...params,
      providerId: user?.userId,
      typeRequestId: requestType,
    })

    return data
  }

  const { filters, items, ...pagination } = useApiPagination<RequestResponse>({
    fetchDataFn,
    pageSize: 5,
  })

  const mappedItems = useMemo<SimpleRequest[]>(
    () =>
      items.map(
        ({
          detailRequests,
          licencePlate,
          brand,
          statusRequest,
          location,
          id,
          statusRequestId,
          scheduledDate,
        }) => ({
          id,
          createdAt: detailRequests?.[0]?.createdDate,
          licencePlate,
          brand,
          status: statusRequest,
          location,
          description: detailRequests?.[0]?.description,
          statusId: statusRequestId,
          scheduledDate,
        })
      ),
    [items]
  )

  const commonColumns = useMemo<Column<SimpleRequest>[]>(
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
        name: 'location',
        label: 'Ubicación',
      },
      {
        name: 'description',
        label: 'Observación',
      },
      {
        name: 'scheduledDate',
        label: 'Fecha agenda',
        formatAs: 'date',
      },
    ],
    []
  )

  const handleFilters = (values: RequestFiltersValues) => {
    Object.entries(values).forEach(([key, value]) => {
      filters.add(key, value)
    })
  }

  return {
    ...pagination,
    commonColumns,
    items,
    mappedItems,
    handleFilters,
  }
}
