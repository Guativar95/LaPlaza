import { toast } from 'react-toastify'
import { RequestTypes } from '@vehicles/common/types'
import useSWR from 'swr'

import { MainLayout } from '@/components/Layout'
import { Footer } from '@/components/ui/Footer'
import { Spinner } from '@/components/ui/Spinner'
import { Wrapper } from '@/components/ui/Wrapper'
import { useAlert } from '@/hooks/useAlerts'
import { useAuth } from '@/lib/auth'

import { PanelCard } from '../../common/components/PanelCard'
import { getUserRequestTypes } from '../api/getUserRequestTypes'
import { requestTypesById, UserRequestInfo } from '../data/requestTypes'

export const HomePage = () => {
  const { user } = useAuth()
  const { data: alerts } = useAlert()

  const fetcher = async () => {
    const { data } = await getUserRequestTypes(user?.userId!)
    const types = data
      .map(({ typeRequestId }) => {
        const id = typeRequestId as RequestTypes
        return requestTypesById[id] ? { ...requestTypesById[id], requestTypeId: id } : null
      })
      .filter((el) => el) as (UserRequestInfo & { requestTypeId: RequestTypes })[]
    return types
  }

  const { data: requestTypes, error } = useSWR(
    user ? ['/request/GetUserTypeRequests', user.userId] : null,
    fetcher
  )

  const isLoading = !requestTypes && !error

  if (error) {
    toast.error('Hemos tenido problemas obteniendo los servicios del usuario')
  }

  return (
    <MainLayout title='Opciones proveedor' wrapper={false}>
      <Wrapper>
        <main className='flex flex-col justify-center gap-5 md:flex-row md:flex-wrap'>
          {requestTypes?.map(({ label, path, icon, requestTypeId }) => (
            <PanelCard
              key={path}
              icon={
                <div className='my-10'>
                  <div className='mx-auto w-20'>{icon}</div>
                </div>
              }
              text={label}
              to={path}
              hasNotifications={alerts?.requests[requestTypeId]?.has}
            />
          ))}

          {isLoading && <Spinner />}

          {requestTypes?.length === 0 && (
            <div className='text-center italic'>
              <p>No tiene tipos de solicitudes asignadas</p>
            </div>
          )}
        </main>
      </Wrapper>

      <Footer className='mt-5' />
    </MainLayout>
  )
}
