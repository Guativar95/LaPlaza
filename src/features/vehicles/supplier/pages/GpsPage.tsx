import { RequestTypes } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'

import { SimpleListOfRequests } from '../components/SimpleListOfRequests'

export const GpsPage = () => {
  return (
    <MainLayout title='Solicitudes de alistamiento'>
      <main>
        <h1 className='text-2xl text-secondary font-bold'>Instalaciones de GPS</h1>
        <SimpleListOfRequests requestType={RequestTypes.gps} />
      </main>
    </MainLayout>
  )
}
