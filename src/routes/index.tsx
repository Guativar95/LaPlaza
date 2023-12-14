import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import { useAuth } from '@/lib/auth'
import { lazyImport } from '@/utils/lazyImport'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

const { MiscRoutes } = lazyImport(() => import('@/features/misc'), 'MiscRoutes')

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth()

  const commonRoutes: RouteObject[] = [
    {
      path: '/',
      element: <Navigate to='/inicio' replace />,
    },
    {
      path: '*',
      element: <MiscRoutes />,
    },
  ]

  const routes = isAuthenticated ? protectedRoutes : publicRoutes
  const element = useRoutes([...commonRoutes, ...routes])

  return <>{element}</>
}
