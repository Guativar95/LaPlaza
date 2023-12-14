import { RequestTypes } from '@vehicles/common'

import { MainLayout } from '@/components/Layout'

import { Requests } from '../components/Requests'

export const WashingRequest = () => {
  return (
    <MainLayout title='Lavado'>
      <main>
        <div>
          <h1 className='text-left my-3 text-2xl text-purple-700 font-semibold'>
            Solicitud lavadas
          </h1>
          <Requests requestType={RequestTypes.cleaning} />
        </div>
      </main>
    </MainLayout>
  )
}
