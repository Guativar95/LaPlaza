import React from 'react'

import { SimpleBooleanGroup } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import { ApplicationFormStepBaseProps } from '../types'

import { InternationalAccountForm } from './InternationalAccountForm'
import { InternationalBusinessForm } from './InternationalBusinessForm'
import { InternationalPatrimonyForm } from './InternationalPatrimonyForm'
import { ForeignProductsValues } from './types'
import { useForeignProductsForm } from './useForeignProductsForm'

export type ForeignProductsFormProps = ApplicationFormStepBaseProps<ForeignProductsValues> & {}

export const ForeignProductsForm: React.FC<ForeignProductsFormProps> = ({
  onSuccess,
  onPrevious,
  defaultValues,
}) => {
  const {
    initialLoading,
    hasInternationalAccount,
    hasInternationalBusiness,
    hasInternationalPatrimony,
    setHasInternationalAccount,
    setHasInternationalBusiness,
    setHasInternationalPatrimony,
    onSubmitAccount,
    onSubmitBusiness,
    onSubmitPatrimony,
    handleSubmit,
    internationalAccountRef,
    internationalBusinessRef,
    internationalPatrimonyRef,
    internationalBusinessTypes,
    accountTypes,
  } = useForeignProductsForm({
    onSuccess,
    defaultHasInternationalAccount: defaultValues?.hasInternationalAccount,
    defaultHasInternationalBusiness: defaultValues?.hasInternationalBusiness,
    defaultHasInternationalPatrimony: defaultValues?.hasInternationalPatrimony,
  })

  if (initialLoading) {
    return <Spinner className='mx-auto' />
  }

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-2xl font-bold'>Operaciones - productos en el exterior</h2>
      <div>
        <SimpleBooleanGroup
          label='¿Tiene operaciones internacionales?'
          defaultValue={hasInternationalBusiness}
          onValueChange={setHasInternationalBusiness}
        />
        {hasInternationalBusiness && (
          <InternationalBusinessForm
            onSuccess={onSubmitBusiness}
            internationalBusinessTypes={[emptySelect, ...internationalBusinessTypes]}
            innerRef={internationalBusinessRef}
            defaultValues={defaultValues?.internationalBusiness ?? undefined}
          />
        )}
      </div>
      <div>
        <SimpleBooleanGroup
          label='¿Tiene patrimonio en el extranjero?'
          defaultValue={hasInternationalPatrimony}
          onValueChange={setHasInternationalPatrimony}
        />
        {hasInternationalPatrimony && (
          <InternationalPatrimonyForm
            onSuccess={onSubmitPatrimony}
            innerRef={internationalPatrimonyRef}
            defaultValues={defaultValues?.internationalPatrimony ?? undefined}
          />
        )}
      </div>
      <div>
        <SimpleBooleanGroup
          label='¿Tiene productos en el extranjero?'
          defaultValue={hasInternationalAccount}
          onValueChange={setHasInternationalAccount}
        />
        {hasInternationalAccount && (
          <InternationalAccountForm
            onSuccess={onSubmitAccount}
            internationalProductTypes={[emptySelect, ...accountTypes]}
            innerRef={internationalAccountRef}
            defaultValues={defaultValues?.internationalAccount ?? undefined}
          />
        )}
      </div>
      <div className='flex flex-col justify-end gap-2 md:flex-row'>
        {onPrevious && (
          <Button color='secondary' onClick={onPrevious}>
            Anterior
          </Button>
        )}
        <Button variant='gradient' onClick={handleSubmit}>
          Siguiente
        </Button>
      </div>
    </div>
  )
}
