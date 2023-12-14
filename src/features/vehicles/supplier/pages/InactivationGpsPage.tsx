import { RequestTypes } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'

import { ListOfGpsRequests } from '../components/ListOfGpsRequests'

export const inactivationGpsPage = () => {
  return (
    <MainLayout title='Solicitudes de desactivación de GPS'>
      <main>
        <h1 className='text-2xl text-secondary font-bold'>Desacticación de GPS</h1>
        <ListOfGpsRequests requestType={RequestTypes.inactiveGPS} />
      </main>
    </MainLayout>
  )
}
