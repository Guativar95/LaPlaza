import { RequestTypes } from '@vehicles/common'

import { MainLayout } from '@/components/Layout'

import { Requests } from '../components/Requests'

export const EnlistmentRequest = () => {
  return (
    <MainLayout title='Alistamiento'>
      <main>
        <div>
          <h1 className='text-left my-3 text-2xl text-purple-700 font-semibold'>Alistamiento</h1>
          <Requests requestType={RequestTypes.enlistment} />
        </div>
      </main>
    </MainLayout>
  )
}
