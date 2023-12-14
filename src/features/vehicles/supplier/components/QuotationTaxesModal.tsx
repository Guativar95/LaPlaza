import { FC } from 'react'
import { DefaultValues } from 'react-hook-form'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { QuotationTaxesForm, QuotationTaxesValues } from './QuotationTaxesForm'

export type QuotationTaxesModalProps = {
  show: boolean
  onClose: () => void
  onSuccess: (values: QuotationTaxesValues) => void
  defaultValues?: DefaultValues<QuotationTaxesValues>
  disabled?: boolean
}

export const QuotationTaxesModal: FC<QuotationTaxesModalProps> = ({
  show,
  onClose,
  onSuccess,
  defaultValues,
  disabled,
}) => {
  return (
    <Modal show={show} onClose={onClose} size='lg'>
      <ModalHeader title='Modificar impuestos de servicio' onClose={onClose} />
      <ModalBody>
        <QuotationTaxesForm
          defaultValues={defaultValues}
          disabled={disabled}
          onSuccess={onSuccess}
        />
      </ModalBody>
    </Modal>
  )
}
