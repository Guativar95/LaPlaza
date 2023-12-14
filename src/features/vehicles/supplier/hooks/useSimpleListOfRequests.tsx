import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Column } from '@/components/ui/Table'

import { RequestResponse, RequestTypes } from '../../common'
import { canConfirm, canSchedule } from '../utils/checkActionAccess'

import { SimpleRequest, useRequestsList } from './useRequestsList'

export type UseSimpleListOfRequests = {
  requestType: RequestTypes
}

export const useSimpleListOfRequests = ({ requestType }: UseSimpleListOfRequests) => {
  const { items, commonColumns, ...restPaginationRequest } = useRequestsList({
    requestType,
  })

  const [selectedSchedule, setSelectedSchedule] = useState<RequestResponse | null>(null)
  const [selectedConfirm, setSelectedConfirm] = useState<RequestResponse | null>(null)

  const columns = useMemo<Column<SimpleRequest>[]>(
    () => [
      ...commonColumns,
      {
        name: 'id',
        label: '',
        render: ({ index }) => {
          const item = items[index]
          if (!item) return null

          const disableSchedule = !canSchedule(item.statusRequestId, item.scheduledDate)
          const disableConfirm = !canConfirm(item.statusRequestId)

          return (
            <>
              <Button
                color='secondary'
                onClick={() => setSelectedSchedule(item)}
                disabled={disableSchedule}
              >
                Agendar
              </Button>
              <Button onClick={() => setSelectedConfirm(item)} disabled={disableConfirm}>
                Confirmar
              </Button>
            </>
          )
        },
      },
    ],
    [commonColumns, items]
  )

  return {
    ...restPaginationRequest,
    columns,
    selectedSchedule,
    selectedConfirm,
    setSelectedSchedule,
    setSelectedConfirm,
  }
}
