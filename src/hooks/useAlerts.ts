import { useMemo } from 'react'
import useSWR from 'swr'

import { inventoryApi } from '@/api/inventoryApi'
import { RequestTypes } from '@/features/vehicles/common'
import { useAuth } from '@/lib/auth'
import { Alerts, RequestAlerts, RoleAlerts } from '@/types'

export const useAlert = () => {
  const { user } = useAuth()

  const fetcher = async () => {
    const { data } = await inventoryApi.get<RoleAlerts>(`/alert/GetAlertsByUser/${user?.userId}`)

    return data
  }

  const { data: alerts, ...rest } = useSWR(user ? ['/alerts', user.roleId] : null, fetcher)

  const data = useMemo<Alerts | undefined>(() => {
    if (alerts) {
      const requests = {} as RequestAlerts
      alerts.moduleAlerts?.forEach(({ typeRequestId, isRead }) => {
        const type = typeRequestId as RequestTypes
        requests[type] ??= { has: !isRead, count: !isRead ? 1 : 0 }

        const hasOtherWithoutRead = requests[type].has === false && !isRead
        if (hasOtherWithoutRead) {
          requests[type].has = true
          requests[type].count++
        }
      })

      return {
        overallReading: alerts.overallReading,
        requests,
      }
    }
  }, [alerts])

  return { data, ...rest }
}
