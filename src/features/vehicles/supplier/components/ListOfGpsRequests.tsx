import { FC } from 'react'

import { Table } from '@/components/ui/Table'

import { RequestFiltersForm } from '../../admin/components/RequestFiltersForm'
import { RequestTypes } from '../../common'
import { useListOfGpsRequests } from '../hooks/useListOfGpsRequests'

import { ConfirmGpsToggleModal } from './ConfirmToggleGpsModal'

export type ListOfGpsRequestsProps = {
  requestType: RequestTypes.activeGPS | RequestTypes.inactiveGPS
}

export const ListOfGpsRequests: FC<ListOfGpsRequestsProps> = ({ requestType }) => {
  const {
    columns,
    handleFilters,
    items,
    pagination,
    isFetching,
    setSelectedConfirm,
    selectedConfirm,
    reloadData,
  } = useListOfGpsRequests({ requestType })

  return (
    <>
      <div className='mb-3'>
        <RequestFiltersForm onSuccess={handleFilters} statusType='gps' />
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
        bodyClassName='bg-white'
      />

      {selectedConfirm && (
        <ConfirmGpsToggleModal
          show
          onClose={() => setSelectedConfirm(null)}
          request={selectedConfirm}
          onSuccess={reloadData}
        />
      )}
    </>
  )
}
