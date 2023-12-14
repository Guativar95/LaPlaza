import { FC } from 'react'

import { BooleanGroup, Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { DefaultValuesForm } from '@/types'

import { publiclyExposedPersonSchema, PubliclyExposedPersonValues } from './types'

export type PubliclyExposedPersonFormProps = {
  onSuccess: (values: PubliclyExposedPersonValues) => void
  defaultValues?: DefaultValuesForm<PubliclyExposedPersonValues>
  onPrevious?: () => void
}

export const PubliclyExposedPersonForm: FC<PubliclyExposedPersonFormProps> = ({
  onSuccess,
  onPrevious,
  defaultValues,
}) => {
  return (
    <Form<PubliclyExposedPersonValues, typeof publiclyExposedPersonSchema>
      schema={publiclyExposedPersonSchema}
      onSubmit={onSuccess}
      options={{ defaultValues }}
      className='mt-5'
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <InputField
              label='Organización'
              registration={register('organization')}
              error={errors.organization}
            />
            <InputField label='Cargo' registration={register('position')} error={errors.position} />
            <BooleanGroup
              control={control}
              label='¿Maneja recursos públicos?'
              name='handlesPublicResources'
              error={errors.handlesPublicResources}
            />
            <InputField
              type='date'
              label='Fecha desvinculación'
              registration={register('unbundlingDate', {
                setValueAs: (val) => {
                  return val ? new Date(val) : undefined
                },
              })}
              error={errors.unbundlingDate}
            />
          </div>
          <div className='flex flex-col gap-2 md:flex-row md:justify-end'>
            {onPrevious && (
              <Button color='secondary' onClick={onPrevious}>
                Anterior
              </Button>
            )}
            <Button type='submit' variant='gradient'>
              Siguiente
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
