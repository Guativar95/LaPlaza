import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '@misc/pages'

import { useAuth } from '@/lib/auth'
import { RoleRoutes } from '@/types'

import { Role } from '../auth'

import { ModalInitialFee } from './user/components/ModalInitialFee'
import { ApplicationProvider } from './user/store/ApplicationContext'
import * as Admin from './admin'
import * as User from './user'

export const ProtectedRoutes = () => {
  const { user } = useAuth()
  if (!user) return null

  const routes: RoleRoutes = {
    [Role.Administrator]: (
      <Routes>
        <Route path='/solicitudes' element={<Admin.ApplicationsPage />} />
      </Routes>
    ),
    [Role.Mechanic]: null,
    [Role.Supplier]: null,
    [Role.Manager]: null,
  }

  return routes[user.roleName]
}

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/nueva-solicitud/:vehicleId' element={<User.NewApplicationPage />} />
      <Route path='/:applicationId/*' element={<ApplicationProvider />}>
        <Route path=':vehicleId/*' element={<User.ApplicationPage />}>
          <Route path='evidente' element={<User.ApplicationValidationPage />} />
        </Route>
        <Route path=':vehicleId/alternativas/*'>
          <Route path='avalistas' element={<User.RegisterGuarantorsPage />} />
          <Route path='vehiculos' element={<User.SimilarVehiclesPage />} />
          <Route path='*' element={<User.CreditAlternativesPage />}>
            <Route path='cuota-inicial' element={<ModalInitialFee />} />
          </Route>
        </Route>
        <Route path='continuar' element={<User.ContinueCreditPage />} />
        <Route path='aprobado' element={<User.ApprovedCreditPage />} />
        <Route path='rechazado' element={<User.RejectedCreditPage />} />
        <Route path=':guarantorId/avalista/*' element={<User.CreditGuarantorPage />}>
          <Route path='evidente' element={<User.CreditGuarantorValidationPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
