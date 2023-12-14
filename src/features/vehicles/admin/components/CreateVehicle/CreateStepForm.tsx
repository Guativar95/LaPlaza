import { useRef } from 'react'
import { toast } from 'react-toastify'

import { ProgressFormItem, ProgressStepBar } from '@/components/ui/Progress'
import { useProgressForm } from '@/components/ui/Progress/ProgressFormContext'

import { ColserautoFormRegister } from '../ColserautoFormRegister'
import { ManageVehicleImages } from '../ManageVehicleImages'

import { CreateForm } from './CreateForm'

export const CreateStepForm = () => {
  const { nextStep, activeStep } = useProgressForm()
  const createdVehicleIdRef = useRef('')

  return (
    <>
      <div className='mb-10'>
        <ProgressStepBar
          currentStep={activeStep}
          steps={[
            {
              text: 'Datos basicos',
            },
            {
              text: 'Colserauto',
            },
            {
              text: 'Imagenes',
            },
          ]}
        />
      </div>
      <div>
        <ProgressFormItem>
          <CreateForm
            onSuccess={(id) => {
              createdVehicleIdRef.current = id
              toast.success('Vehículo creado exitosamente')
              nextStep()
            }}
          />
        </ProgressFormItem>
        <ProgressFormItem>
          <ColserautoFormRegister
            vehicleId={createdVehicleIdRef.current}
            onSuccess={() => {
              toast.success('Datos de Colserauto asociados al vehículo')
              nextStep()
            }}
          />
        </ProgressFormItem>
        <ProgressFormItem>
          <ManageVehicleImages vehicleId={createdVehicleIdRef.current} />
        </ProgressFormItem>
      </div>
    </>
  )
}
