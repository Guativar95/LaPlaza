import { FC, ReactNode } from 'react'
import { DefaultValues } from 'react-hook-form'

import { BooleanGroup, Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { DefaultValuesForm } from '@/types'

import { publiclyExposedPersonSchema, PubliclyExposedPersonValues } from './types'

export type PubliclyExposedPersonFormProps = {
  actions?: ReactNode
  onSuccess: (values: PubliclyExposedPersonValues) => void
  defaultValues?: DefaultValuesForm<PubliclyExposedPersonValues>
  onPrevious?: () => void
  saveProgressOnChange?: (values: DefaultValues<PubliclyExposedPersonValues>) => void
}

export const PubliclyExposedPersonForm: FC<PubliclyExposedPersonFormProps> = ({
  actions,
  onSuccess,
  onPrevious,
  defaultValues,
  saveProgressOnChange,
}) => {
  return (
    <Form<PubliclyExposedPersonValues, typeof publiclyExposedPersonSchema>
      schema={publiclyExposedPersonSchema}
      onSubmit={onSuccess}
      options={{ defaultValues }}
      className='mt-5'
    >
      {({ register, control, getValues, formState: { errors } }) => (
        <>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <InputField
              label='Organización'
              registration={register('organization', {
                onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
              })}
              error={errors.organization}
            />
            <InputField
              label='Cargo'
              registration={register('position', {
                onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
              })}
              error={errors.position}
            />
            <BooleanGroup
              control={control}
              label='¿Maneja recursos públicos?'
              name='handlesPublicResources'
              error={errors.handlesPublicResources}
              onValueChange={() => saveProgressOnChange && saveProgressOnChange(getValues())}
            />
            <InputField
              type='date'
              label='Fecha desvinculación'
              registration={register('unbundlingDate', {
                onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
              })}
              error={errors.unbundlingDate}
            />
          </div>
          <div className='flex flex-col justify-between gap-3 md:flex-row'>
            <div className='flex flex-col md:flex-row'>
              {onPrevious && (
                <Button color='light' onClick={onPrevious}>
                  Anterior
                </Button>
              )}
            </div>
            <div className='flex flex-col gap-2 md:flex-row'>
              {actions}
              <Button type='submit' variant='gradient'>
                Siguiente
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}
