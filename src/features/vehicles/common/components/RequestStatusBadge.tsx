import { FC, ReactNode } from 'react'
import { Badge } from 'flowbite-react'

import { StatusVehicle } from '../types'

export type RequestStatusBadgeProps = {
  status: StatusVehicle
  children: ReactNode
}
export type Colors = {
  [key in StatusVehicle]?: string
}
export const RequestStatusBadge: FC<RequestStatusBadgeProps> = ({ status, children }) => {
  const colors: Colors = {
    [StatusVehicle.completed]: 'success',
    [StatusVehicle.pending]: 'failure',
    [StatusVehicle.scheduled]: 'info',
    [StatusVehicle.pendingQuotation]: 'failure',
    [StatusVehicle.agendaQuotation]: 'info',
    [StatusVehicle.quoted]: 'warning',
    [StatusVehicle.rejected]: 'failure',
  }
  const color = colors[status]
  return <Badge color={color}>{children} </Badge>
}
