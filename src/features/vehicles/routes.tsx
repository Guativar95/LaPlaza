import { Route, Routes } from 'react-router-dom'

import { useAuth } from '@/lib/auth'
import { RoleRoutes } from '@/types'

import { Role } from '../auth'
import { NotFoundPage } from '../misc'

import { RepairProvier } from './admin/store/RepairContext'
import * as Admin from './admin'
import * as Manager from './manager'
import * as Supplier from './supplier'
import { Details as DetailsUser, Vehicles } from './user'

const AdminAndMecanicRoutes = () => (
  <Routes>
    <Route path='/' element={<Admin.Inventory />} />
    <Route path='/:id' element={<Admin.Details />} />
    <Route path='/:id/imagenes' element={<Admin.Images />} />
    <Route path='/editar' element={<Admin.Edit />} />
    <Route path='/admin' element={<Admin.Admin />} />
    <Route path='/crear' element={<Admin.CreateVehiclePage />} />
    <Route
      path='/:id/cotizacion'
      element={
        <RepairProvier>
          <Admin.RepairQuote />
        </RepairProvier>
      }
    />
    <Route path='/solicitudes/alistamiento' element={<Admin.EnlistmentRequest />} />
    <Route path='/solicitudes/gps' element={<Admin.DetailsGpsRequest />} />
    <Route path='/solicitudes/lavado' element={<Admin.WashingRequest />} />
    <Route path='/solicitudes/reparacion' element={<Admin.RepairsPage />} />
    <Route path='/solicitudes/reparacion/:id' element={<Admin.QuotationPage />} />
    <Route path='/solicitudes/reparacion/:id' element={<Admin.QuotationPage />} />
    <Route path='/seguro' element={<Admin.VehicleSecure />} />
    <Route path='/prima-mensual' />
  </Routes>
)

export const ProtectedRoutes = () => {
  const { user } = useAuth()
  if (!user) return null

  // TODO: supplier routes assigned to role
  const routes: RoleRoutes = {
    [Role.Administrator]: <AdminAndMecanicRoutes />,
    [Role.Mechanic]: <AdminAndMecanicRoutes />,
    [Role.Supplier]: (
      <Routes>
        <Route path='/admin' element={<Supplier.HomePage />} />
        <Route path='/reparacion' element={<Supplier.RepairPage />} />
        <Route path='/reparacion/:id' element={<Supplier.QuotationPage />} />
        <Route path='/alistamiento' element={<Supplier.EnlistmentPage />} />
        <Route path='/gps' element={<Supplier.GpsPage />} />
        <Route path='/lavado' element={<Supplier.WashingPage />} />
        <Route path='/activar-gps' element={<Supplier.ActivationGpsPage />} />
        <Route path='/desactivar-gps' element={<Supplier.inactivationGpsPage />} />
        <Route path='/planmantenimiento' element={<Supplier.SecurePage />} />
      </Routes>
    ),
    [Role.Manager]: (
      <Routes>
        <Route path='/admin' element={<Manager.HomePage />} />
        <Route path='/*' element={<Manager.InventoryPage />}>
          <Route path=':id' element={<Manager.EditVehicleModalPage />} />
        </Route>
      </Routes>
    ),
  }

  return routes[user.roleName]
}

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Vehicles />} />
      <Route path='/:id' element={<DetailsUser />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}
