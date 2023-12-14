import React, { useEffect, useState } from 'react'
import { DefaultValues } from 'react-hook-form'

import { SimpleBooleanGroup } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import {
  InternationalAccountValues,
  InternationalBusinessValues,
  InternationalPatrimonyValues,
} from '../../ApplicationForms'
import { ApplicationFormStepBaseProps } from '../types'

import { InternationalAccountForm } from './InternationalAccountForm'
import { InternationalBusinessForm } from './InternationalBusinessForm'
import { InternationalPatrimonyForm } from './InternationalPatrimonyForm'
import { ForeignProductsValues } from './types'
import { useForeignProductsForm } from './useForeignProductsForm'

export type ForeignProductsFormProps = ApplicationFormStepBaseProps<ForeignProductsValues> & {}

export const ForeignProductsForm: React.FC<ForeignProductsFormProps> = ({
  actions,
  onSuccess,
  onPrevious,
  defaultValues,
  saveProgressOnChange,
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

  const [internationalBusiness, setInternationalBusiness] =
    useState<DefaultValues<InternationalBusinessValues>>()
  const [internationalAccount, setInternationalAccount] =
    useState<DefaultValues<InternationalAccountValues>>()
  const [internationalPatrimony, setInternationalPatrimony] =
    useState<DefaultValues<InternationalPatrimonyValues>>()

  useEffect(() => {
    saveProgressOnChange &&
      saveProgressOnChange({
        hasInternationalAccount,
        hasInternationalBusiness,
        hasInternationalPatrimony,
        internationalAccount,
        internationalBusiness,
        internationalPatrimony,
      })
  }, [
    hasInternationalAccount,
    hasInternationalBusiness,
    hasInternationalPatrimony,
    internationalAccount,
    internationalBusiness,
    internationalPatrimony,
  ])

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
          onValueChange={(val) => {
            setHasInternationalBusiness(val)
            if (!val) setInternationalBusiness(undefined)
          }}
        />
        {hasInternationalBusiness && (
          <InternationalBusinessForm
            onSuccess={onSubmitBusiness}
            internationalBusinessTypes={[emptySelect, ...internationalBusinessTypes]}
            innerRef={internationalBusinessRef}
            defaultValues={defaultValues?.internationalBusiness ?? undefined}
            saveProgressOnChange={setInternationalBusiness}
          />
        )}
      </div>
      <div>
        <SimpleBooleanGroup
          label='¿Tiene patrimonio en el extranjero?'
          defaultValue={hasInternationalPatrimony}
          onValueChange={(val) => {
            setHasInternationalPatrimony(val)
            if (!val) setInternationalPatrimony(undefined)
          }}
        />
        {hasInternationalPatrimony && (
          <InternationalPatrimonyForm
            onSuccess={onSubmitPatrimony}
            innerRef={internationalPatrimonyRef}
            defaultValues={defaultValues?.internationalPatrimony ?? undefined}
            saveProgressOnChange={setInternationalPatrimony}
          />
        )}
      </div>
      <div>
        <SimpleBooleanGroup
          label='¿Tiene productos en el extranjero?'
          defaultValue={hasInternationalAccount}
          onValueChange={(val) => {
            setHasInternationalAccount(val)
            if (!val) setInternationalAccount(undefined)
          }}
        />
        {hasInternationalAccount && (
          <InternationalAccountForm
            onSuccess={onSubmitAccount}
            internationalProductTypes={[emptySelect, ...accountTypes]}
            innerRef={internationalAccountRef}
            defaultValues={defaultValues?.internationalAccount ?? undefined}
            saveProgressOnChange={setInternationalAccount}
          />
        )}
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
          <Button variant='gradient' onClick={handleSubmit}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
