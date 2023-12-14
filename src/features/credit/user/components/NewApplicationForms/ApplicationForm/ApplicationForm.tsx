import { FC, useMemo } from 'react'
import { useApplicationStepper } from '@credit/user/store/ApplicationStepperContext'
import { Tab } from '@headlessui/react'

import { Button } from '@/components/ui/Button'

import { ApplicationSkeleton } from '../../ApplicationSkeleton'
import { CreditForm } from '../CreditForm'
import { FinancialAndLaborInfoForm } from '../FinancialAndLaborInfoForm'
import { ForeignProductsForm } from '../ForeignProductsForm'
import { GoodsAndVehiclesForm } from '../GoodsAndVehiclesForm'
import { PepsForm } from '../PepsForm'
import { PersonalInfoForm } from '../PersonalInfoForm'
import { ReferencesForm } from '../ReferencesForm'
import { ApplicationRefs } from '../types'
import { VerificationForm } from '../VerificationForm'

export type ApplicationFormProps = {}

export const ApplicationForm: FC<ApplicationFormProps> = () => {
  const {
    isLoading,
    applicationRef,
    applicationId,
    vehicle,
    form,
    nextStep,
    previousStep,
    fetchApplicantDataAfterVerification,
    handleSaveProcess,
    handleAskAssistance,
    otpVerificationStatus,
    setOtpVerificationStatus,
  } = useApplicationStepper()
  const { activeStepIndex, setActiveStepIndex, steps, setSteps } = form

  const actions = useMemo(
    () => (
      <>
        {applicationRef !== ApplicationRefs.continueConsultant && (
          <Button color='tertiary' onClick={handleAskAssistance}>
            Solicitar ayuda
          </Button>
        )}
        <Button color='secondary' onClick={handleSaveProcess}>
          Guardar solicitud
        </Button>
      </>
    ),
    [applicationRef, handleSaveProcess, handleAskAssistance]
  )

  if (isLoading) return <ApplicationSkeleton />

  return (
    <>
      <Tab.Group selectedIndex={activeStepIndex} onChange={setActiveStepIndex}>
        <Tab.List hidden>
          <Tab>Verificación identidad</Tab>
          <Tab>Información personal</Tab>
          <Tab>Información laboral</Tab>
          <Tab>Información PEPs</Tab>
          <Tab>Productos extranjeros</Tab>
          <Tab>Bienes y vehículos</Tab>
          <Tab>Referencias</Tab>
          <Tab>Información de crédito</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <VerificationForm
              applicationId={applicationId}
              vehicleId={vehicle.vehicleId}
              onSuccess={() => fetchApplicantDataAfterVerification()}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PersonalInfoForm
              actions={actions}
              defaultValues={steps.personalInfo?.currentValues ?? steps.personalInfo?.validValues}
              applicationId={applicationId}
              onPrevious={previousStep}
              initialVerificationStatus={otpVerificationStatus}
              onChangeVerificationStatus={setOtpVerificationStatus}
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  personalInfo: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
                nextStep()
              }}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  personalInfo: {
                    ...prevStepsValues.personalInfo,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <FinancialAndLaborInfoForm
              actions={actions}
              defaultValues={
                steps.financialAndLaborInfo?.currentValues ??
                steps.financialAndLaborInfo?.validValues
              }
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  financialAndLaborInfo: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
                nextStep()
              }}
              onPrevious={previousStep}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  financialAndLaborInfo: {
                    ...prevStepsValues.financialAndLaborInfo,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PepsForm
              actions={actions}
              defaultValues={steps.pepsInfo?.currentValues ?? steps.pepsInfo?.validValues}
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  pepsInfo: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
                nextStep()
              }}
              onPrevious={previousStep}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  pepsInfo: {
                    ...prevStepsValues.pepsInfo,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ForeignProductsForm
              actions={actions}
              defaultValues={
                steps.foreignProducts?.currentValues ?? steps.foreignProducts?.validValues
              }
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  foreignProducts: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
                nextStep()
              }}
              onPrevious={previousStep}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  foreignProducts: {
                    ...prevStepsValues.foreignProducts,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <GoodsAndVehiclesForm
              actions={actions}
              defaultValues={
                steps.goodsAndVehicles?.currentValues ?? steps.goodsAndVehicles?.validValues
              }
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  goodsAndVehicles: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
                nextStep()
              }}
              onPrevious={previousStep}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  goodsAndVehicles: {
                    ...prevStepsValues.goodsAndVehicles,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ReferencesForm
              actions={actions}
              defaultValues={steps.references?.currentValues ?? steps.references?.validValues}
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  references: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
                nextStep()
              }}
              onPrevious={previousStep}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  references: {
                    ...prevStepsValues.references,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
          <Tab.Panel>
            <CreditForm
              actions={actions}
              defaultValues={steps.creditInfo?.currentValues ?? steps.creditInfo?.validValues}
              onSuccess={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  creditInfo: {
                    isDirty: true,
                    isValid: true,
                    validValues: values,
                  },
                }))
              }}
              onPrevious={previousStep}
              vehicle={vehicle}
              saveProgressOnChange={(values) => {
                setSteps((prevStepsValues) => ({
                  ...prevStepsValues,
                  creditInfo: {
                    ...prevStepsValues.creditInfo,
                    currentValues: values,
                  },
                }))
              }}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
