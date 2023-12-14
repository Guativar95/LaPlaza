import React, { FC, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { RequestTypes } from '@vehicles/common/types'

import { Form, NumericField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { updateVehicle, UpdateVehicleDTO } from '../../api/updateVehicle'

import { simpleObservationSchema, SimpleObservationValues } from './types'

export type SimpleObservationFormProps = {
  vehicleId: string
  onSuccess: SubmitHandler<SimpleObservationValues>
  requestType: RequestTypes
  onError?: SubmitErrorHandler<SimpleObservationValues>
  isLoading?: boolean
  disabled?: boolean
  setSelectedVehicleId: React.Dispatch<React.SetStateAction<string | null>>
}

export const SimpleObservationSecure: FC<SimpleObservationFormProps> = ({
  vehicleId,
  onError,
  disabled,
  onSuccess,
  setSelectedVehicleId,
}) => {
  const [valueObservation, setValueObservation] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    const request: UpdateVehicleDTO = {
      vehicleId,
      basicMaintenance: valueObservation,
    }

    try {
      if (valueObservation !== 0) {
        const { status } = await updateVehicle(request)
        if (status === 200) {
          toast.success('Se envio el valor de forma correcta')
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido Problemas  al enviar el valor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form<SimpleObservationValues, typeof simpleObservationSchema>
      schema={simpleObservationSchema}
      onSubmit={onSuccess}
      onError={onError}
    >
      {({ formState: { errors } }) => (
        <>
          <NumericField
            label={<span className='text-lg   text-primary-700 font-bold'>Valor mensual </span>}
            error={errors.description}
            onChange={(e) =>
              setValueObservation(+e.target.value.replace('$ ', '').replace(/,/g, ''))
            }
            className='resize-x rounded-md w-56 h-10'
            maxLength={15}
            value={valueObservation}
            formatAs='currency'
          />
          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='gradient'
              isLoading={isLoading}
              disabled={disabled || isLoading}
              onClick={() => {
                handleSubmit()
                setSelectedVehicleId(null)
              }}
            >
              Confirmar
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
