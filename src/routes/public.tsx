import { RouteObject } from 'react-router-dom'

import { lazyImport } from '@/utils/lazyImport'

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes')
const { PublicRoutes: VehiclesRoutes } = lazyImport(
  () => import('@/features/vehicles/routes'),
  'PublicRoutes'
)
const { PublicRoutes: CreditRoutes } = lazyImport(
  () => import('@/features/credit/routes'),
  'PublicRoutes'
)

export const publicRoutes: RouteObject[] = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  {
    path: '/vehiculos/*',
    element: <VehiclesRoutes />,
  },
  {
    path: '/creditos/*',
    element: <CreditRoutes />,
  },
]
