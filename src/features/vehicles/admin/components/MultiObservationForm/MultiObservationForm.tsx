import { FC, useEffect, useState } from 'react'
import { DefaultValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { zodResolver } from '@hookform/resolvers/zod'

import { Option, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { RequestTypes } from '@/features/vehicles/common'
import { emptySelect } from '@/utils/defaults'

import { getEstimateTypes } from '../../api/getEstimateTypes'
import { getProvidersByRequestType } from '../../api/getProviders'

import { multiObservationSchema, MultiObservationValues } from './types'

export type MultiObservationFormProps = {
  onSuccess: SubmitHandler<MultiObservationValues>
  requestType: RequestTypes
  defaultValues?: DefaultValues<MultiObservationValues>
  formId?: string
  showSubmitButton?: boolean
  disabled?: boolean
  isLoading?: boolean
  maxObservations?: number
}

export const MultiObservationForm: FC<MultiObservationFormProps> = ({
  onSuccess,
  defaultValues,
  isLoading,
  disabled,
  formId,
  requestType,
  maxObservations = 5,
  showSubmitButton = true,
}) => {
  const [providers, setProviders] = useState<Option[]>([])
  const [estimates, setEstimates] = useState<Option[]>([])
  const {
    register,
    control,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<MultiObservationValues>({
    resolver: zodResolver(multiObservationSchema),
    mode: 'all',
    defaultValues: defaultValues ?? {
      observations: [{ descriptionId: '' }],
    },
  })

  const {
    fields,
    append,
    remove: removeObservation,
  } = useFieldArray({
    control,
    name: 'observations',
  })

  const appendObservation = () => {
    append({ descriptionId: '' })
  }

  const loadSelects = async () => {
    try {
      const [providersRes, estimatesRes] = await Promise.all([
        getProvidersByRequestType(requestType),
        getEstimateTypes(),
      ])
      setProviders(
        providersRes.data.map(({ userId, userName }) => ({ label: userName, value: userId }))
      )
      setEstimates(estimatesRes.data.map(({ id, name }) => ({ label: name, value: id })))
    } catch (error) {}
  }

  useEffect(() => {
    loadSelects()
  }, [])

  return (
    <form id={formId} onSubmit={handleSubmit(onSuccess)}>
      <div>
        <SelectField
          options={[emptySelect, ...estimates]}
          registration={register(`observations.${fields.length - 1}.descriptionId`)}
          error={errors.observations?.[fields.length - 1]?.descriptionId}
        />
      </div>
      {!disabled && fields.length < maxObservations && (
        <div className='flex justify-end'>
          <Button
            variant='text'
            className='py-1'
            onClick={() => {
              trigger(`observations.${fields.length - 1}.descriptionId`).then((isValid) => {
                isValid && appendObservation()
              })
            }}
          >
            Agregar otra observación
          </Button>
        </div>
      )}
      {fields.length > 1 && (
        <details className='mb-4'>
          <summary className='select-none'>Mostrar {fields.length - 1} observacion(es)</summary>
          <ul className='list-disc ml-8'>
            {fields.slice(0, -1).map((item, index) => (
              <li key={item.id}>
                <div className='flex gap-2'>
                  <p>{estimates.find((el) => el.value === Number(item.descriptionId))?.label}</p>
                  <button onClick={() => removeObservation(index)}>
                    <BsTrash className='text-red-500' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}
      <SelectField
        label='Proveedor'
        options={[emptySelect, ...providers]}
        registration={register('providerId')}
        error={errors.providerId}
        disabled={disabled}
      />
      {showSubmitButton && (
        <div className='flex justify-end my-5'>
          <Button type='submit' isLoading={isLoading} disabled={isLoading || disabled}>
            Enviar cotización
          </Button>
        </div>
      )}
    </form>
  )
}
