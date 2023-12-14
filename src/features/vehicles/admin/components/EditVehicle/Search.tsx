import { ChangeEvent, FC } from 'react'
import { DefaultValues } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { z } from 'zod'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  licencePlate: z
    .string()
    .min(1, 'Campo requerido')
    .regex(/[A-Z]{3}[0-9]{3}/, 'La placa no es valida'),
})

export type SearchValues = {
  licencePlate: string
}

export type SearchProps = {
  onSuccess: (values: SearchValues) => void
  onReset: () => void
  defaultValues?: DefaultValues<SearchValues>
  isLoading?: boolean
  isFound?: boolean
}

export const Search: FC<SearchProps> = ({
  onSuccess,
  onReset,
  defaultValues,
  isLoading,
  isFound,
}) => {
  return (
    <Form<SearchValues, typeof schema>
      schema={schema}
      onSubmit={onSuccess}
      options={{
        mode: 'all',
        defaultValues,
      }}
    >
      {({ register, formState }) => (
        <div className='flex flex-col gap-2 w-full md:flex-row md:items-end md:flex-1 '>
          <div className='w-full'>
            <InputField
              type='text'
              label='Placa'
              placeholder='ABC123'
              maxLength={6}
              error={formState.errors.licencePlate}
              registration={register('licencePlate', {
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value || ''
                  e.target.value = value.toUpperCase().trim()
                },
              })}
            />
          </div>
          <div
            className={`flex gap-1 flex-col md:flex-row ${
              formState.errors.licencePlate && 'md:mb-5'
            }`}
          >
            <Button type='submit' className='w-full' disabled={isLoading}>
              Consultar
            </Button>
            {isFound && (
              <Button
                color='light'
                type='reset'
                aria-label='Limpiar busqueda'
                onClick={() => onReset()}
              >
                <IoMdClose className='text-2xl text-primary' />
              </Button>
            )}
          </div>
        </div>
      )}
    </Form>
  )
}
