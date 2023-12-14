import { FC, useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import { RequestTypes } from '@vehicles/common/types'

import { Form, Option, SelectField, TextAreaField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { emptySelect } from '@/utils/defaults'

import { getProvidersByRequestType } from '../../api/getProviders'

import { simpleObservationSchema, SimpleObservationValues } from './types'

export type SimpleObservationFormProps = {
  onSuccess: SubmitHandler<SimpleObservationValues>
  requestType: RequestTypes
  onError?: SubmitErrorHandler<SimpleObservationValues>
  isLoading?: boolean
  disabled?: boolean
}

export const SimpleObservationForm: FC<SimpleObservationFormProps> = ({
  onSuccess,
  requestType,
  onError,
  disabled,
  isLoading,
}) => {
  const [providers, setProviders] = useState([] as Option[])

  const loadSelects = async () => {
    try {
      const { data } = await getProvidersByRequestType(requestType)
      setProviders(data.map(({ userId, userName }) => ({ label: userName, value: userId })))
    } catch (error) {
      toast.error('Hemos tenido problemas obteniendo los proveedores')
    }
  }

  useEffect(() => {
    loadSelects()
  }, [])

  return (
    <Form<SimpleObservationValues, typeof simpleObservationSchema>
      schema={simpleObservationSchema}
      onSubmit={onSuccess}
      onError={onError}
    >
      {({ register, formState: { errors } }) => (
        <>
          <SelectField
            label='Proveedor'
            options={[emptySelect, ...providers]}
            registration={register('providerId')}
            error={errors.providerId}
          />
          <TextAreaField
            label={<span className='text-lg  text-primary-700 font-bold'>Observaciones</span>}
            registration={register('description')}
            error={errors.description}
            className='resize-x rounded-md w-96 h-40'
          />
          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='gradient'
              isLoading={isLoading}
              disabled={disabled || isLoading}
            >
              Confirmar
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
