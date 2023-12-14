import { FC } from 'react'
import { IoMdClose } from 'react-icons/io'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { applicationsSearcherSchema, ApplicationsSearcherValues } from './types'

export type ApplicationsSearcherFormProps = {
  onSuccess: (values: ApplicationsSearcherValues) => void
  onReset: () => void
  isLoading?: boolean
}

export const ApplicationsSearcherForm: FC<ApplicationsSearcherFormProps> = ({
  onSuccess,
  onReset,
  isLoading,
}) => {
  return (
    <Form<ApplicationsSearcherValues, typeof applicationsSearcherSchema>
      schema={applicationsSearcherSchema}
      onSubmit={onSuccess}
      onReset={onReset}
    >
      {({ register, setValue, getValues, formState: { errors } }) => (
        <div className='flex justify-end items-start gap-2'>
          <InputField
            aria-label='Placa'
            placeholder='Placa'
            className='mt-0'
            registration={register('licencePlate', {
              onChange: (e) => {
                const { value = '' } = e.target
                e.target.value = value.toUpperCase()
              },
            })}
            error={errors.licencePlate}
            maxLength={6}
          />
          <div className='flex gap-2'>
            <Button type='submit' disabled={isLoading}>
              Buscar
            </Button>
            {getValues('licencePlate') && (
              <Button
                type='reset'
                onClick={() => setValue('licencePlate', '')}
                color='light'
                aria-label='Remover placa'
              >
                <IoMdClose />
              </Button>
            )}
          </div>
        </div>
      )}
    </Form>
  )
}
