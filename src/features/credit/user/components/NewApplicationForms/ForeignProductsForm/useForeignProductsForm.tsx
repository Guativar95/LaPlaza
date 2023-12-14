import { useEffect, useRef, useState } from 'react'
import { getAccountTypes, getInternationalBusinessTypes } from '@credit/user/api/creditSelects'

import { Option } from '@/components/Form'
import { mapSelectToOption } from '@/utils/maps'

import {
  ForeignProductsValues,
  InternationalAccountValues,
  InternationalBusinessValues,
  InternationalPatrimonyValues,
} from './types'

type FormValues<T extends Record<string, unknown>> = {
  isValid: boolean
  values?: T
}

export type UseForeignProductsForm = {
  onSuccess: (values: ForeignProductsValues) => void
  defaultHasInternationalAccount?: boolean
  defaultHasInternationalBusiness?: boolean
  defaultHasInternationalPatrimony?: boolean
}

const defaultValues = { isValid: false }

export const useForeignProductsForm = ({
  onSuccess,
  defaultHasInternationalAccount,
  defaultHasInternationalBusiness,
  defaultHasInternationalPatrimony,
}: UseForeignProductsForm) => {
  const internationalBusinessRef = useRef<HTMLFormElement>(null)
  const internationalAccountRef = useRef<HTMLFormElement>(null)
  const internationalPatrimonyRef = useRef<HTMLFormElement>(null)

  const [initialLoading, setInitialLoading] = useState(true)

  const [internationalBusinessTypes, setInternationalBusinessTypes] = useState<Option[]>([])
  const [accountTypes, setAccountTypes] = useState<Option[]>([])

  const [submitCount, setSubmitCount] = useState(0)
  const [accountForm, setAccountForm] =
    useState<FormValues<InternationalAccountValues>>(defaultValues)
  const [businessForm, setBusinessForm] =
    useState<FormValues<InternationalBusinessValues>>(defaultValues)
  const [patrimonyForm, setPatrimonyForm] =
    useState<FormValues<InternationalPatrimonyValues>>(defaultValues)

  const [hasInternationalBusiness, setHasInternationalBusiness] = useState<boolean | undefined>(
    defaultHasInternationalBusiness
  )
  const [hasInternationalAccount, setHasInternationalAccount] = useState<boolean | undefined>(
    defaultHasInternationalAccount
  )
  const [hasInternationalPatrimony, setHasInternationalPatrimony] = useState<boolean | undefined>(
    defaultHasInternationalPatrimony
  )

  const onSubmitBusiness = (values: InternationalBusinessValues) => {
    setBusinessForm({
      isValid: true,
      values,
    })
  }

  const onSubmitAccount = (values: InternationalAccountValues) => {
    setAccountForm({
      isValid: true,
      values,
    })
  }

  const onSubmitPatrimony = (values: InternationalPatrimonyValues) => {
    setPatrimonyForm({
      isValid: true,
      values,
    })
  }

  const handleSubmit = () => {
    const allAreSelected = [
      hasInternationalAccount,
      hasInternationalBusiness,
      hasInternationalPatrimony,
    ].some((e) => e !== undefined)

    if (!allAreSelected) return

    if (internationalAccountRef.current && hasInternationalAccount) {
      setAccountForm((d) => ({ ...d, isValid: false }))
      internationalAccountRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    } else if (!hasInternationalAccount) {
      setAccountForm({ isValid: true })
    }

    if (internationalBusinessRef.current && hasInternationalBusiness) {
      setBusinessForm((d) => ({ ...d, isValid: false }))
      internationalBusinessRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    } else if (!hasInternationalBusiness) {
      setBusinessForm({ isValid: true })
    }

    if (internationalPatrimonyRef.current && hasInternationalPatrimony) {
      setPatrimonyForm((d) => ({ ...d, isValid: false }))
      internationalPatrimonyRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    } else if (!hasInternationalPatrimony) {
      setPatrimonyForm({ isValid: true })
    }

    setSubmitCount(submitCount + 1)
  }

  useEffect(() => {
    const allAreSelected = [
      hasInternationalAccount,
      hasInternationalBusiness,
      hasInternationalPatrimony,
    ].some((e) => e !== undefined)

    if (!allAreSelected) return

    if (accountForm.isValid && businessForm.isValid && patrimonyForm.isValid) {
      onSuccess({
        hasInternationalAccount: hasInternationalAccount!,
        hasInternationalBusiness: hasInternationalBusiness!,
        hasInternationalPatrimony: hasInternationalPatrimony!,
        ...(accountForm.values && { internationalAccount: accountForm.values }),
        ...(businessForm.values && { internationalBusiness: businessForm.values }),
        ...(patrimonyForm.values && { internationalPatrimony: patrimonyForm.values }),
      })
    }
  }, [submitCount, accountForm.isValid, businessForm.isValid, patrimonyForm.isValid])

  const getSelectValues = async () => {
    try {
      const [internationalBusinessTypeRes, accountTypesRes] = await Promise.all([
        getInternationalBusinessTypes(),
        getAccountTypes(),
      ])

      setInternationalBusinessTypes(mapSelectToOption(internationalBusinessTypeRes.data))
      setAccountTypes(mapSelectToOption(accountTypesRes.data))
    } catch (error) {
    } finally {
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    getSelectValues()
  }, [])

  return {
    initialLoading,
    internationalBusinessTypes,
    accountTypes,
    hasInternationalAccount,
    hasInternationalBusiness,
    hasInternationalPatrimony,
    setHasInternationalAccount,
    setHasInternationalBusiness,
    setHasInternationalPatrimony,
    internationalAccountRef,
    internationalBusinessRef,
    internationalPatrimonyRef,
    onSubmitAccount,
    onSubmitBusiness,
    onSubmitPatrimony,
    handleSubmit,
  }
}
