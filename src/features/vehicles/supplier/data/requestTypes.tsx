import { ReactElement } from 'react'
import { MdOutlineLocationOff, MdOutlineLocationOn } from 'react-icons/md'
import { LocationAdmin, MechanicAdmin, ServiceAdmin, ToolsAdmin } from '@vehicles/admin/icons'
import { RequestTypes } from '@vehicles/common/types'

export type UserRequestInfo = {
  path: string
  label: string
  icon: ReactElement
}

export type RequestTypesById = {
  [key in RequestTypes]?: UserRequestInfo
}

export const requestTypesById: RequestTypesById = {
  [RequestTypes.enlistment]: {
    path: '/vehiculos/alistamiento',
    label: 'Solicitudes de alistamiento',
    icon: <MechanicAdmin />,
  },
  [RequestTypes.cleaning]: {
    path: '/vehiculos/lavado',
    label: 'Solicitudes de lavado',
    icon: <ServiceAdmin />,
  },
  [RequestTypes.gps]: {
    path: '/vehiculos/gps',
    label: 'Solicitudes de GPS',
    icon: <LocationAdmin />,
  },
  [RequestTypes.repair]: {
    path: '/vehiculos/reparacion',
    label: 'Solicitudes de reparación',
    icon: <ToolsAdmin />,
  },
  [RequestTypes.activeGPS]: {
    path: '/vehiculos/activar-gps',
    label: 'Solicitudes de activación de GPS',
    icon: <MdOutlineLocationOn className='mx-auto text-black' size={82} />,
  },
  [RequestTypes.inactiveGPS]: {
    path: '/vehiculos/desactivar-gps',
    label: 'Solicitudes de desactivación de GPS',
    icon: <MdOutlineLocationOff className='mx-auto text-black' size={82} />,
  },
}
