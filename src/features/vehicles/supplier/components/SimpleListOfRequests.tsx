import { FC } from 'react'

import { Table } from '@/components/ui/Table'

import { RequestFiltersForm } from '../../admin/components/RequestFiltersForm'
import { RequestTypes, StatusVehicle } from '../../common'
import { useSimpleListOfRequests } from '../hooks/useSimpleListOfRequests'

import { ConfirmServiceModal } from './ConfirmServiceModal'
import { ScheduleModal } from './ScheduleModal'

export type SimpleListOfRequestsProps = {
  requestType: RequestTypes
}

export const SimpleListOfRequests: FC<SimpleListOfRequestsProps> = ({ requestType }) => {
  const {
    columns,
    mappedItems,
    selectedSchedule,
    setSelectedSchedule,
    selectedConfirm,
    setSelectedConfirm,
    isFetching,
    pagination,
    reloadData,
    handleFilters,
  } = useSimpleListOfRequests({ requestType })

  return (
    <>
      <div className='mb-3'>
        <RequestFiltersForm onSuccess={handleFilters} statusType='requests' />
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
        bodyClassName='bg-white'
      />

      {selectedSchedule && (
        <ScheduleModal
          show
          onClose={() => setSelectedSchedule(null)}
          request={{
            ...selectedSchedule,
            statusRequestId: StatusVehicle.scheduled,
          }}
          onSuccess={reloadData}
        />
      )}
      {selectedConfirm && (
        <ConfirmServiceModal
          show
          onClose={() => setSelectedConfirm(null)}
          request={selectedConfirm}
          onSuccess={reloadData}
        />
      )}
    </>
  )
}
