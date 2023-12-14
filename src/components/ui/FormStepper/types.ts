import { Dispatch, ReactNode, SetStateAction } from 'react'
import { DefaultValues, FieldValues } from 'react-hook-form'

export type IStepsValues = Record<string, FieldValues>

export type IFormStep<TValue extends FieldValues> = {
  isValid: boolean
  isDirty: boolean
  validValues?: TValue
  currentValues?: DefaultValues<TValue>
}

export type ConstructStepActionsFn<TValues extends IStepsValues> = <TKey extends keyof TValues>(
  key: TKey
) => {
  setFormStep: Dispatch<SetStateAction<IFormStep<TValues[TKey]>>>
}

export type IFormSteps<TValues extends IStepsValues> = {
  [key in keyof TValues]: IFormStep<TValues[key]>
}

export type IFormStepper<TValues extends IStepsValues> = {
  activeStepIndex: number
  steps: IFormSteps<TValues>
  setActiveStepIndex: Dispatch<SetStateAction<number>>
  setLastStepChecked: Dispatch<SetStateAction<number>>
  setSteps: Dispatch<SetStateAction<IFormSteps<TValues>>>
  constructStepActions: ConstructStepActionsFn<TValues>
}

export type IFormStepperContextValue<TValues extends IStepsValues> = {
  form: IFormStepper<TValues>
}

export type DefaultStepValues<TValues extends IStepsValues> = {
  [key in keyof TValues]?: DefaultValues<TValues[key]>
}

export type IBaseFormStepperProviderProps<TValues extends IStepsValues> = {
  children: ReactNode
  defaultValues?: DefaultStepValues<TValues>
  initialStepIndex?: number
}
