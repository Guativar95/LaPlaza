import { RequestTypes } from '@vehicles/common'

import { MainLayout } from '@/components/Layout'

import { Requests } from '../components/Requests'

export const DetailsGpsRequest = () => {
  return (
    <MainLayout title='Lista gps'>
      <main>
        <div className='grid grid-cols-1 m-auto text-center'>
          <h1 className='text-left my-3 text-2xl text-purple-700 font-semibold'>
            Solicitudes de gps
          </h1>
          <Requests requestType={RequestTypes.gps} />
        </div>
      </main>
    </MainLayout>
  )
}
