import React, { useEffect, useMemo, useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ColserautoField, ColserautoValue, ColserautoVehicle } from '@vehicles/common'

import { InputField, Option, SelectField } from '@/components/Form'
import { RadioField } from '@/components/Form/RadioField'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import { createColserautoVehicle } from '../api/createColserautoVehicle'
import { getColserautoFields } from '../api/getColserautoFields'
import { updateColserautoVehicle } from '../api/updateColserautoVehicle'

export type ColserautoFormProps = {
  vehicleId: string
  onSuccess?: () => void
  defaultValues?: ColserautoValue[]
}

export const ColserautoForm: React.FC<ColserautoFormProps> = ({
  vehicleId,
  onSuccess,
  defaultValues,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'all' })
  const [fields, setFields] = useState<ColserautoField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadColserautoFields = async () => {
    const { data } = await getColserautoFields()
    setFields(data)
    setIsLoading(false)
  }

  const mapColserautoData = (values: any, type: string = 'create'): ColserautoVehicle[] => {
    const valuesAsArray = Object.entries(values)
    return valuesAsArray.map(([id, value]) => {
      return type === 'create'
        ? {
            colserautoId: Number(id),
            vehicleId,
            value: String(value),
          }
        : {
            colserautoId: Number(id),
            vehicleId,
            value:
              value === 'Sí' ||
              value === 'No' ||
              value === 'Asistida' ||
              value === 'Eléctrica' ||
              value === 'Hidráulica' ||
              value === 'Mecánica'
                ? value
                : String(defaultValues?.find((df) => df.colserautoId === Number(id))?.value),
            actual:
              value === 'Sí' ||
              value === 'No' ||
              value === 'Asistida' ||
              value === 'Eléctrica' ||
              value === 'Hidráulica' ||
              value === 'Mecánica'
                ? undefined
                : String(value),
          }
    })
  }

  const createValues = async (values: any) => {
    setIsSubmitting(true)
    const colserautoVehicles = mapColserautoData(values)
    try {
      const { status } = await createColserautoVehicle({ colserautoVehicles })
      if (status >= 200 && status < 300) {
        onSuccess && onSuccess()
      }
    } catch (error) {
      toast.error(`Hemos tenido problemas guardando los datos de Colserauto`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateValues = async (values: any) => {
    setIsSubmitting(true)
    const colserautoVehicles = mapColserautoData(values, 'update')
    try {
      const { status } = await updateColserautoVehicle({ colserautoVehicles })
      if (status >= 200 && status < 300) {
        onSuccess && onSuccess()
      }
    } catch (error) {
      toast.error(`Hemos tenido problemas guardando los datos de Colserauto`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // TODO: should come from API
  const options = useMemo<Option[]>(
    () => [
      { label: 'Asistida', value: 'Asistida' },
      { label: 'Eléctrica', value: 'Eléctrica' },
      { label: 'Hidráulica', value: 'Hidráulica' },
      { label: 'Mecánica', value: 'Mecánica' },
    ],
    []
  )

  const valueToBoolean = (value?: string) => {
    if (!value) return

    return value === 'Sí'
  }

  useEffect(() => {
    loadColserautoFields()
  }, [])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center gap-2'>
        <Spinner size='md' />
        <p>Cargando campos Colserauto...</p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(defaultValues ? updateValues : createValues)}>
        <div className='grid gap-3 md:grid-cols-2'>
          {fields
            .filter((field) => field.type === 'select' || field.type === 'bool')
            .map(({ type, name, id }) => {
              const defaultValue = defaultValues?.find((el) => el.colserautoId === id)?.value

              switch (type) {
                case 'select':
                  return (
                    <SelectField
                      key={id}
                      label={name}
                      options={[emptySelect, ...options]}
                      defaultValue={defaultValue}
                      registration={register(id.toString(), {
                        required: 'Campo requerido',
                      })}
                      error={errors?.[id] as FieldError}
                    />
                  )

                case 'bool':
                  return (
                    <div key={id} className=''>
                      <p>{name}</p>
                      <div className='flex gap-3 py-2.5'>
                        <RadioField
                          label='Sí'
                          name={id.toString()}
                          defaultChecked={valueToBoolean(defaultValue) === true}
                          value='Sí'
                          registration={register(id.toString(), {
                            required: 'Campo requerido',
                          })}
                        />
                        <RadioField
                          label='No'
                          value='No'
                          defaultChecked={valueToBoolean(defaultValue) === false}
                          registration={register(id.toString(), {
                            required: 'Campo requerido',
                          })}
                        />
                      </div>
                      {errors?.[id] && (
                        <span className='text-sm text-red-500'>
                          {errors?.[id]?.message as string}
                        </span>
                      )}
                    </div>
                  )

                default:
                  return null
              }
            })}
        </div>

        <div className='grid gap-3 grid-cols-2'>
          <div className=''>
            <h3 className='text-xl text-center font-semibold '>Inicial</h3>
          </div>
          <div className=''>
            <h3 className='text-xl text-center font-semibold '>Actual</h3>
          </div>
          {fields
            .filter((field) => field.type === 'string' || field.type === 'numeric')
            .map(({ type, name, id }) => {
              const defaultValue = defaultValues?.find((el) => el.colserautoId === id)?.value

              switch (type) {
                case 'string':
                  return (
                    <InputField
                      key={id}
                      label={name}
                      defaultValue={defaultValue}
                      registration={register(id.toString(), {
                        required: 'Campo requerido',
                      })}
                      error={errors?.[id] as FieldError}
                    />
                  )
                case 'numeric':
                  return (
                    <>
                      <div className='flex items-center'>
                        <div className='w-1/3 mx-4'>
                          <label>{name}</label>
                        </div>
                        <div className='w-2/3'>
                          <InputField
                            type='number'
                            key={id}
                            className='text-center'
                            defaultValue={defaultValue}
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-1/3 mx-4'>
                          <label>{name}</label>
                        </div>
                        <div className='w-2/3'>
                          <InputField
                            type='number'
                            key={id}
                            className='text-center'
                            defaultValue={String(
                              defaultValues?.find((df) => df.colserautoId === Number(id))?.actual
                            )}
                            registration={register(id.toString(), {
                              required: 'Campo requerido',
                              min: { value: 1, message: 'Minimo 1' },
                              max: { value: 100, message: 'Maximo 100' },
                            })}
                            error={errors?.[id] as FieldError}
                            min={0}
                            max={100}
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </>
                  )

                default:
                  return null
              }
            })}
        </div>
        <div className='flex justify-end gap-2 mt-2'>
          <Button type='submit' variant='gradient' isLoading={isSubmitting}>
            {defaultValues ? 'Guardar' : 'Siguiente'}
          </Button>
        </div>
      </form>
    </>
  )
}
