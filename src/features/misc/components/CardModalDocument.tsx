import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type CardModalDocumentProps = {
  showCardDocument: boolean
  onClose: () => void
}

export const CardModalDocument: React.FC<CardModalDocumentProps> = ({
  showCardDocument,
  onClose,
}) => {
  return (
    <Modal show={showCardDocument} size='sm'>
      <ModalHeader title='Documentos y tramites' onClose={onClose} />
      <ModalBody>
        <p className='pb-4'></p>
      </ModalBody>
    </Modal>
  )
}
