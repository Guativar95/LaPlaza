import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type CardModalHomeProps = {
  showCardHome: boolean
  onClose: () => void
}

export const CardModalHome: React.FC<CardModalHomeProps> = ({ showCardHome, onClose }) => {
  return (
    <Modal show={showCardHome} size='sm'>
      <ModalHeader title='Entregamos tu carro a domicilio' onClose={onClose} />
      <ModalBody>
        <p className='pb-4 '>
          Para que ésto se efectúe, tu vehículo debe estar totalmente pago o tu crédito debe estar
          desembolsado.
        </p>
      </ModalBody>
    </Modal>
  )
}
