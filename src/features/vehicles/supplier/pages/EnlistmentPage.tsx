import { RequestTypes } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'

import { SimpleListOfRequests } from '../components/SimpleListOfRequests'

export const EnlistmentPage = () => {
  return (
    <MainLayout title='Solicitudes de alistamiento'>
      <main>
        <h1 className='text-2xl text-secondary font-bold'>Alistamiento</h1>
        <SimpleListOfRequests requestType={RequestTypes.enlistment} />
      </main>
    </MainLayout>
  )
}
