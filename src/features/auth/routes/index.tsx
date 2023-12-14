import { Route, Routes } from 'react-router-dom'

import { ChangePassword } from './ChangePassword'
import { Login } from './Login'
import { RecoverPassword } from './RecoverPassword'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='recuperar-clave' element={<RecoverPassword />} />
      <Route path='cambiar-clave' element={<ChangePassword />} />
    </Routes>
  )
}
