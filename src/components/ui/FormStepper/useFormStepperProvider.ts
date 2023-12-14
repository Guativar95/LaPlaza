import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Entries } from '@/types'

import {
  ConstructStepActionsFn,
  DefaultStepValues,
  IFormStepperContextValue,
  IFormSteps,
  IStepsValues,
} from './types'

interface UseFormStepperProviderParams<TValues extends IStepsValues> {
  defaultValues?: DefaultStepValues<TValues>
  initialStepIndex?: number
  onComplete?: (values: TValues) => void
  stepsQuantity: number
}

export function useFormStepperProvider<TValues extends IStepsValues>({
  defaultValues,
  initialStepIndex = 0,
  stepsQuantity,
  onComplete,
}: UseFormStepperProviderParams<TValues>): IFormStepperContextValue<TValues> {
  const [lastStepChecked, setLastStepChecked] = useState(initialStepIndex)
  const [activeStepIndex, setActiveStepIndex] = useState(initialStepIndex)
  const [steps, setSteps] = useState<IFormSteps<TValues>>(() => {
    const steps = {} as IFormSteps<TValues>

    for (const key in defaultValues) {
      const typedKey = key as keyof TValues
      steps[typedKey] = {
        isDirty: false,
        isValid: false,
        currentValues: (defaultValues as any)[typedKey],
      }
    }

    return steps
  })
  const setStepsInterceptor: Dispatch<SetStateAction<IFormSteps<TValues>>> = (payload) => {
    setLastStepChecked(activeStepIndex)
    setSteps(payload)
  }

  const constructStepActions: ConstructStepActionsFn<TValues> = (key) => {
    return {
      setFormStep: (payload) => {
        const isAction = typeof payload === 'function'

        setLastStepChecked(activeStepIndex)
        setSteps((prevSteps): IFormSteps<TValues> => {
          const prevStep = prevSteps[key]
          const newStep = isAction ? payload(prevStep) : payload

          return { ...prevSteps, [key]: newStep }
        })
      },
    }
  }

  useEffect(() => {
    const isLastChecked = lastStepChecked === stepsQuantity
    if (!isLastChecked) return

    const stepsAsEntries = Object.entries(steps) as Entries<IFormSteps<TValues>>
    const hasAllStepsValues = stepsAsEntries.length === stepsQuantity
    const areAllStepsValid = stepsAsEntries.every(([, form]) => form.isValid && form.validValues)

    const isComplete = hasAllStepsValues && areAllStepsValid
    if (!isComplete) return

    const values = {} as TValues
    stepsAsEntries.forEach(([key, form]) => {
      values[key as keyof TValues] = form.validValues!
    })

    onComplete && onComplete(values)
  }, [lastStepChecked, steps])

  return {
    form: {
      activeStepIndex,
      constructStepActions,
      setActiveStepIndex,
      setSteps: setStepsInterceptor,
      setLastStepChecked,
      steps,
    },
  }
}
