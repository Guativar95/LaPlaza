import { FC, useEffect, useState } from 'react'
import { DefaultValues, FieldError } from 'react-hook-form'

import { SimpleBooleanGroup } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { ApplicationFormStepBaseProps } from '../types'

import { PubliclyExposedPersonForm } from './PubliclyExposedPersonForm'
import { PepsValues, PubliclyExposedPersonValues } from './types'

export type PepsFormProps = ApplicationFormStepBaseProps<PepsValues> & {}

export const PepsForm: FC<PepsFormProps> = ({
  actions,
  onSuccess,
  onPrevious,
  defaultValues,
  saveProgressOnChange,
}) => {
  const {
    isPublicServant: defaultIsPublicServant,
    publiclyExposedPerson: defaultPubliclyExposedPerson,
  } = defaultValues ?? {}

  const [isPublicServant, setIsPublicServant] = useState<boolean | null>(
    defaultIsPublicServant ?? null
  )
  const [publiclyExposedPerson, setPubliclyExposedPerson] =
    useState<DefaultValues<PubliclyExposedPersonValues>>()
  const [error, setError] = useState<FieldError>()

  const handleSubmit = (values?: PubliclyExposedPersonValues) => {
    if (isPublicServant === null) return setError({ type: 'required', message: 'Campo requerido' })

    onSuccess({
      isPublicServant,
      ...(values && { publiclyExposedPerson: values }),
    })
  }

  const handleChangePubliclyExposedPerson = (
    values: DefaultValues<PubliclyExposedPersonValues>
  ) => {
    setPubliclyExposedPerson(values)
  }

  useEffect(() => {
    saveProgressOnChange &&
      saveProgressOnChange({
        ...(isPublicServant !== null && { isPublicServant }),
        publiclyExposedPerson,
      })
  }, [publiclyExposedPerson, isPublicServant])

  return (
    <div>
      <h2 className='text-2xl mb-5 font-bold'>Persona expuesta políticamente - PEPS</h2>

      <SimpleBooleanGroup
        label='¿Es funcionario público?'
        defaultValue={isPublicServant ?? undefined}
        onValueChange={(val) => {
          setIsPublicServant(val)
          if (!val) setPubliclyExposedPerson(undefined)
          setError(undefined)
        }}
        error={error}
      />
      {isPublicServant ? (
        <PubliclyExposedPersonForm
          actions={actions}
          onSuccess={handleSubmit}
          onPrevious={onPrevious}
          defaultValues={defaultPubliclyExposedPerson}
          saveProgressOnChange={handleChangePubliclyExposedPerson}
        />
      ) : (
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
            <Button variant='gradient' onClick={() => handleSubmit()}>
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
