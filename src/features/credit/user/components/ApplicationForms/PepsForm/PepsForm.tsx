import { FC, useState } from 'react'
import { FieldError } from 'react-hook-form'

import { SimpleBooleanGroup } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { ApplicationFormStepBaseProps } from '../types'

import { PubliclyExposedPersonForm } from './PubliclyExposedPersonForm'
import { PepsValues, PubliclyExposedPersonValues } from './types'

export type PepsFormProps = ApplicationFormStepBaseProps<PepsValues> & {}

export const PepsForm: FC<PepsFormProps> = ({ onSuccess, onPrevious, defaultValues }) => {
  const { isPublicServant: defaultIsPublicServant, publiclyExposedPerson } = defaultValues ?? {}

  const [isPublicServant, setIsPublicServant] = useState<boolean | null>(
    defaultIsPublicServant ?? null
  )
  const [error, setError] = useState<FieldError>()

  const handleSubmit = (values?: PubliclyExposedPersonValues) => {
    if (isPublicServant === null) return setError({ type: 'required', message: 'Campo requerido' })

    onSuccess({
      isPublicServant,
      ...(values && { publiclyExposedPerson: values }),
    })
  }

  return (
    <div>
      <h2 className='text-2xl mb-5 font-bold'>Persona expuesta políticamente - PEPS</h2>

      <SimpleBooleanGroup
        label='¿Es funcionario público?'
        defaultValue={isPublicServant ?? undefined}
        onValueChange={(val) => {
          setIsPublicServant(val)
          setError(undefined)
        }}
        error={error}
      />
      {isPublicServant ? (
        <PubliclyExposedPersonForm
          onSuccess={handleSubmit}
          onPrevious={onPrevious}
          defaultValues={publiclyExposedPerson}
        />
      ) : (
        <div className='flex flex-col gap-2 md:flex-row md:justify-end'>
          {onPrevious && (
            <Button color='secondary' onClick={onPrevious}>
              Anterior
            </Button>
          )}
          <Button variant='gradient' onClick={() => handleSubmit()}>
            Siguiente
          </Button>
        </div>
      )}
    </div>
  )
}
