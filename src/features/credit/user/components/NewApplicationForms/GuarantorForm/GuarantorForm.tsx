import { FC } from 'react'
import { Applicant } from '@credit/common'
import { useApplicantForm } from '@credit/user/hooks/useApplicantForm'

import { DefaultValuesForm } from '@/types'

import { FinancialAndLaborInfoForm } from '../FinancialAndLaborInfoForm'
import { ForeignProductsForm, ForeignProductsValues } from '../ForeignProductsForm'
import { FormStep } from '../FormStep'
import { GoodsAndVehiclesForm, GoodsAndVehicleValues } from '../GoodsAndVehiclesForm'
import { PepsForm, PepsValues } from '../PepsForm'
import { PersonalInfoForm } from '../PersonalInfoForm'
import { ReferencesForm, ReferenceValues } from '../ReferencesForm'
import { VerificationForm } from '../VerificationForm'

export type GuarantorFormProps = {
  applicationId: string
  guarantorId: number
  isVerified?: boolean
  onSuccess: (data: Applicant) => void
}

export const GuarantorForm: FC<GuarantorFormProps> = ({
  applicationId,
  guarantorId,
  isVerified,
  onSuccess,
}) => {
  const {
    activeStep,
    nextStep,
    previousStep,
    setPepsInfo,
    setFinancialAndLaborInfo,
    setForeignProducts,
    setGoodsAndVehicles,
    setPersonalInfo,
    setReferences,
    pepsInfo,
    financialAndLaborInfo,
    foreignProducts,
    goodsAndVehicles,
    personalInfo,
    references,
    defaultPersonalInfo,
    defaultFinancialAndLaborInfo,
    defaultPepsInfo,
    defaultForeignProducts,
    defaultGoodsAndVehicles,
    defaultReferences,
    getVerificationData,
  } = useApplicantForm({ onSuccess, isVerified, applicationId, guarantorId })

  return (
    <>
      <FormStep index={1} active={activeStep}>
        <VerificationForm
          applicationId={applicationId}
          onSuccess={() => {
            getVerificationData()
            nextStep()
          }}
          guarantorId={guarantorId}
          metadata={{ guarantorId }}
        />
      </FormStep>
      <FormStep index={2} active={activeStep}>
        <PersonalInfoForm
          defaultValues={personalInfo ?? defaultPersonalInfo}
          applicationId={applicationId}
          onPrevious={previousStep}
          onSuccess={(values) => {
            setPersonalInfo(values)
            nextStep()
          }}
        />
      </FormStep>
      <FormStep index={3} active={activeStep}>
        <FinancialAndLaborInfoForm
          defaultValues={financialAndLaborInfo ?? defaultFinancialAndLaborInfo}
          onSuccess={(values) => {
            setFinancialAndLaborInfo(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={4} active={activeStep}>
        <PepsForm
          defaultValues={pepsInfo ?? (defaultPepsInfo as DefaultValuesForm<PepsValues>)}
          onSuccess={(values) => {
            setPepsInfo(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={5} active={activeStep}>
        <ForeignProductsForm
          defaultValues={
            foreignProducts ?? (defaultForeignProducts as DefaultValuesForm<ForeignProductsValues>)
          }
          onSuccess={(values) => {
            setForeignProducts(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={6} active={activeStep}>
        <GoodsAndVehiclesForm
          defaultValues={
            goodsAndVehicles ??
            (defaultGoodsAndVehicles as DefaultValuesForm<GoodsAndVehicleValues>)
          }
          onSuccess={(values) => {
            setGoodsAndVehicles(values)
            nextStep()
          }}
          onPrevious={previousStep}
        />
      </FormStep>
      <FormStep index={7} active={activeStep}>
        <ReferencesForm
          defaultValues={references ?? (defaultReferences as DefaultValuesForm<ReferenceValues>)}
          onSuccess={(values) => {
            setReferences(values)
          }}
          onPrevious={previousStep}
        />
      </FormStep>
    </>
  )
}
