import { FC, ReactElement } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { RequestResponse, RequestTypes } from '@vehicles/common'
import { getRequests } from '@vehicles/common/api/getRequests'

import { Button } from '@/components/ui/Button'
import { PaginationFooter } from '@/components/ui/Pagination'
import { Spinner } from '@/components/ui/Spinner'
import { FetchDataProps, useApiPagination } from '@/hooks/useApiPagination'

import { RequestFiltersForm, RequestFiltersValues } from './RequestFiltersForm'
import { RequestsList } from './RequestsList'

export type RequestsProps = {
  requestType: RequestTypes
  renderAction?: (request: RequestResponse) => ReactElement
}

export const Requests: FC<RequestsProps> = ({ requestType, renderAction }) => {
  const navigate = useNavigate()
  const fetchDataFn = async (params: FetchDataProps) => {
    const { data: res } = await getRequests({ ...params, typeRequestId: requestType })
    const { pageIndex, pageCount, count, data } = res

    return {
      data,
      pageCount,
      pageIndex,
      count,
    }
  }

  const { items, isFetching, pagination, filters, isInitialFetching } =
    useApiPagination<RequestResponse>({
      fetchDataFn,
      pageSize: 5,
    })

  const handleFilters = (values: RequestFiltersValues) => {
    Object.entries(values).forEach(([key, value]) => {
      filters.add(key, value)
    })
  }

  return (
    <>
      <div className='flex justify-start'>
        <Button variant='text' onClick={() => navigate(-1)}>
          <span className='flex items-center gap-2'>
            <BsChevronLeft />
            <span>Atras</span>
          </span>
        </Button>
      </div>
      <div>
        {isInitialFetching ? (
          <Spinner className='mx-auto' />
        ) : (
          <>
            <RequestFiltersForm
              onSuccess={handleFilters}
              statusType={requestType === RequestTypes.repair ? 'repairs' : 'requests'}
            />
            <RequestsList requests={items} renderAction={renderAction} />
            <div className='flex justify-center'>
              <PaginationFooter
                currentPage={pagination.pageIndex}
                totalPages={pagination.pageCount}
                isFirstPage={pagination.isFirstPage}
                isLastPage={pagination.isLastPage}
                nextPage={pagination.nextPage}
                prevPage={pagination.prevPage}
                isLoading={isFetching}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
