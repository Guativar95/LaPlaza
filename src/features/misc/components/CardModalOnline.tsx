import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type CardModalOnlineProps = {
  showCardOnline: boolean
  onClose: () => void
}

export const CardModalOnline: React.FC<CardModalOnlineProps> = ({ showCardOnline, onClose }) => {
  return (
    <Modal show={showCardOnline} size='sm'>
      <ModalHeader title='Compra en línea' onClose={onClose} />
      <ModalBody>
        <p className='pb-4 '>
          La aprobación de tu crédito está sujeta a las políticas de crédito de la entidad
          financiera alidada.
        </p>
      </ModalBody>
    </Modal>
  )
}
