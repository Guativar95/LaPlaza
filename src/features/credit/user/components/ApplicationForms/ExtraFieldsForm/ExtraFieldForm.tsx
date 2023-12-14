import { FC, useState } from 'react'
import { AiOutlineCar } from 'react-icons/ai'

import { Button } from '@/components/ui/Button'
import { Modal, ModalBody } from '@/components/ui/Modal'

import { CreditOptions } from '../../CreditOptions'
import { FormStep } from '../FormStep'

import { BeneficiariesForm } from './BeneficiariesForm'
import { ExtraApplicantInfoForm } from './ExtraApplicantInfoForm'
import { FinancialInfoForm } from './FinancialInfoForm'
import { HealthForm } from './HealthForm'
import { ExtraCreditFields } from './types'
import { useExtraFields } from './useExtraFields'

export type ExtraFieldFormProps = {
  onSuccess: (values: ExtraCreditFields) => void
  isLoading?: boolean
}

export const ExtraFieldForm: FC<ExtraFieldFormProps> = ({ isLoading, onSuccess }) => {
  const {
    step,
    creditSelection,
    setCreditSelection,
    extraPersonalInfo,
    setExtraPersonalInfo,
    financialInfo,
    setFinancialInfo,
    beneficiaries,
    setBeneficiaries,
    healthInfo,
    setHealthInfo,
  } = useExtraFields({ onSuccess })
  const { activeStep, nextStep, previousStep } = step

  const [show, setShow] = useState(true)

  return (
    <>
      <FormStep active={activeStep} index={1}>
        <CreditOptions
          onSuccess={(values) => {
            setCreditSelection(values)
            nextStep()
          }}
          defaultValues={creditSelection}
        />
      </FormStep>
      <FormStep active={activeStep} index={2}>
        <>
          <Modal show={show}>
            <ModalBody>
              <div className='flex justify-center'>
                <AiOutlineCar className='text-primary' size={150} />
              </div>
              <p className='text-lg'>
                ¡Tu vehículo está muy cerca de ser aprobado! Estamos revisando los últimos detalles
                y pronto podrás disfrutarlo. ¡Gracias por confiar en nosotros!
              </p>
              <div className='flex justify-end mt-2'>
                <Button variant='gradient' onClick={() => setShow(false)}>
                  De acuerdo
                </Button>
              </div>
            </ModalBody>
          </Modal>

          <ExtraApplicantInfoForm
            onSuccess={(values) => {
              setExtraPersonalInfo(values)
              nextStep()
            }}
            onPrevious={previousStep}
            defaultValues={extraPersonalInfo}
          />
        </>
      </FormStep>
      <FormStep active={activeStep} index={3}>
        <FinancialInfoForm
          onSuccess={(values) => {
            setFinancialInfo(values)
            nextStep()
          }}
          onPrevious={previousStep}
          defaultValues={financialInfo}
        />
      </FormStep>
      <FormStep active={activeStep} index={4}>
        <BeneficiariesForm
          onSuccess={(values) => {
            setBeneficiaries(values)
            nextStep()
          }}
          onPrevious={previousStep}
          defaultValues={beneficiaries}
        />
      </FormStep>
      <FormStep active={activeStep} index={5}>
        <HealthForm
          onSuccess={(values) => {
            setHealthInfo(values)
          }}
          onPrevious={previousStep}
          defaultValues={healthInfo}
          isLoading={isLoading}
        />
      </FormStep>
    </>
  )
}
