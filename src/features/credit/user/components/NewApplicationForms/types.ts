import { ReactNode } from 'react'
import { DefaultValues, FieldValues } from 'react-hook-form'

import { FinancialAndLaborInfoValues } from './FinancialAndLaborInfoForm/types'
import { ForeignProductsValues } from './ForeignProductsForm/types'
import { GoodsAndVehicleValues } from './GoodsAndVehiclesForm/types'
import { PepsValues } from './PepsForm/types'
import { PersonalInfoValues } from './PersonalInfoForm/types'
import { ReferenceValues } from './ReferencesForm/types'

export type OnSuccessApplicationForm<T extends FieldValues> = (values: T) => void

export type OnSubmitPersonalInfoForm = OnSuccessApplicationForm<PersonalInfoValues>
export type OnSubmitFinancialAndLaborInfoForm =
  OnSuccessApplicationForm<FinancialAndLaborInfoValues>
export type OnSubmitPerpsForm = OnSuccessApplicationForm<PepsValues>
export type OnSubmitForeignProductsForm = OnSuccessApplicationForm<ForeignProductsValues>
export type OnSubmitGoodsAndVehiclesForm = OnSuccessApplicationForm<GoodsAndVehicleValues>
export type OnSubmitReferences = OnSuccessApplicationForm<ReferenceValues>

export type ApplicationFormStepBaseProps<T extends FieldValues> = {
  onSuccess: OnSuccessApplicationForm<T>
  defaultValues?: DefaultValues<T>
  onPrevious?: () => void
  actions?: ReactNode
  saveProgressOnChange?: (values: DefaultValues<T>) => void
}

export enum ApplicationRefs {
  manualVerification = 'manual_verification',
  continueProgress = 'continue_progress',
  continueConsultant = 'continue_consultant',
}
