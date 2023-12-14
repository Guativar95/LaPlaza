import { useNavigate } from 'react-router-dom'

import { Layout } from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  const navigate = useNavigate()
  const onSuccess = () => {
    navigate('/vehiculos/admin')
  }

  return (
    <Layout title='Iniciar sesión'>
      <LoginForm onSuccess={onSuccess} />
    </Layout>
  )
}
