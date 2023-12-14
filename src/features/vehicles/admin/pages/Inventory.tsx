import { MainLayout } from '@/components/Layout'

import { DetailsVehicle } from '../components/DetailsVehicle'

export const Inventory = () => {
  return (
    <MainLayout title='Lista de vehículo'>
      <main>
        <DetailsVehicle />
      </main>
    </MainLayout>
  )
}
