import { RequestTypes } from '@vehicles/common'

import { MainLayout } from '@/components/Layout'
import { LinkButton } from '@/components/ui/Button'

import { Requests } from '../components/Requests'

export const RepairsPage = () => {
  return (
    <MainLayout title='Reparaciones'>
      <main>
        <div className='grid grid-cols-1 m-auto text-center'>
          <h1 className='text-left my-3 text-2xl text-purple-700 font-semibold'>
            Solicitudes de reparación
          </h1>
          <Requests
            requestType={RequestTypes.repair}
            renderAction={({ id }) => (
              <LinkButton to={id.toString()} color='tertiary'>
                Gestionar
              </LinkButton>
            )}
          />
        </div>
      </main>
    </MainLayout>
  )
}
