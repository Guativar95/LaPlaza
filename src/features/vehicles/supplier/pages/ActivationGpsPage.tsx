import { RequestTypes } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'

import { ListOfGpsRequests } from '../components/ListOfGpsRequests'

export const ActivationGpsPage = () => {
  return (
    <MainLayout title='Solicitudes de activación de GPS'>
      <main>
        <h1 className='text-2xl text-secondary font-bold'>Activación de GPS</h1>
        <ListOfGpsRequests requestType={RequestTypes.activeGPS} />
      </main>
    </MainLayout>
  )
}
