import { MainLayout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { ProgressFormProvider } from '@/components/ui/Progress/ProgressFormContext'

import { CreateStepForm } from '../components/CreateVehicle'

export const CreateVehiclePage = () => {
  return (
    <>
      <MainLayout title='Registro Vehicular'>
        <Card>
          <div className='container mx-auto'>
            <h1 className='text-3xl font-semibold mb-5'>Registrar datos vehículo</h1>
            <ProgressFormProvider>
              <CreateStepForm />
            </ProgressFormProvider>
          </div>
        </Card>
      </MainLayout>
    </>
  )
}
