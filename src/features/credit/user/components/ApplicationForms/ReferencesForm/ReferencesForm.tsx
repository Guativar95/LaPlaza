import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert } from 'flowbite-react'

import { InputField } from '@/components/Form'
import { NumericField } from '@/components/Form/NumericField'
import { Button } from '@/components/ui/Button'

import { ApplicationFormStepBaseProps } from '../types'

import { referencesSchema, ReferenceValues } from './types'

export type ReferencesFormProps = ApplicationFormStepBaseProps<ReferenceValues> & {}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({
  onSuccess,
  onPrevious,
  defaultValues,
}) => {
  const form = useForm<ReferenceValues>({
    resolver: zodResolver(referencesSchema),
    defaultValues,
  })

  const {
    fields: referenceFields,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({
    control: form.control,
    name: 'references',
  })

  return (
    <form onSubmit={form.handleSubmit(onSuccess)}>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Referencias familiares y personales</h2>
        <Button
          variant='text'
          onClick={() =>
            appendReference({
              cellphoneNumber: '',
              lastName: '',
              name: '',
              phoneNumber: '',
              relationShip: '',
            })
          }
          disabled={referenceFields.length >= 3}
        >
          Agregar
        </Button>
      </div>
      <div className='flex flex-col gap-2 my-2'>
        {referenceFields.map(({ id }, index) => (
          <div
            key={id}
            className='relative p-3 pt-5 border border-gray-200 rounded-lg grid gap-3 md:grid-cols-2'
          >
            <button
              type='button'
              onClick={() => {
                removeReference(index)
              }}
              className='absolute top-2 right-2 text-red-500 text-xl'
            >
              <BsTrash />
            </button>
            <Controller
              control={form.control}
              name={`references.${index}.relationShip`}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputField
                  label='Parentesco'
                  onChange={onChange}
                  defaultValue={value}
                  error={error}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`references.${index}.name`}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputField
                  label='Nombres'
                  onChange={onChange}
                  defaultValue={value}
                  error={error}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`references.${index}.lastName`}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputField
                  label='Apellidos'
                  onChange={onChange}
                  defaultValue={value}
                  error={error}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`references.${index}.phoneNumber`}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <NumericField
                  label='Teléfono'
                  onValueChange={({ value }) => onChange(value)}
                  defaultValue={value}
                  error={error}
                />
              )}
            />
            <Controller
              control={form.control}
              name={`references.${index}.cellphoneNumber`}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <NumericField
                  label='Celular'
                  onValueChange={({ value }) => onChange(value)}
                  defaultValue={value}
                  error={error}
                />
              )}
            />
          </div>
        ))}
        {form.formState.errors.references?.message && (
          <div className='my-2' role='alert'>
            <Alert color='failure'>
              <p>{form.formState.errors.references?.message}</p>
            </Alert>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 mt-5 md:flex-row md:justify-end'>
        {onPrevious && (
          <Button color='secondary' onClick={onPrevious}>
            Anterior
          </Button>
        )}
        <Button type='submit' variant='gradient'>
          Siguiente
        </Button>
      </div>
    </form>
  )
}
