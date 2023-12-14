import { RouteObject } from 'react-router-dom'

import { lazyImport } from '@/utils/lazyImport'

const { ProtectedRoutes: CreditRoutes } = lazyImport(
  () => import('@/features/credit/routes'),
  'ProtectedRoutes'
)
const { ProtectedRoutes: VehiclesRoutes } = lazyImport(
  () => import('@/features/vehicles/routes'),
  'ProtectedRoutes'
)

export const protectedRoutes: RouteObject[] = [
  {
    path: '/creditos/*',
    element: <CreditRoutes />,
  },
  {
    path: '/vehiculos/*',
    element: <VehiclesRoutes />,
  },
]
