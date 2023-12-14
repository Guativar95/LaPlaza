import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'

export const NewApplicationPage = () => {
  const navigate = useNavigate()
  const { vehicleId } = useParams()
  const applicationId = uuidV4()

  if (!vehicleId) {
    navigate('/404', { replace: true })
  }

  return <Navigate to={`/creditos/${applicationId}/${vehicleId}`} replace />
}
