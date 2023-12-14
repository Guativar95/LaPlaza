import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type CardModalToolProps = {
  showCardTool: boolean
  onClose: () => void
}

export const CardModalTool: React.FC<CardModalToolProps> = ({ showCardTool, onClose }) => {
  return (
    <Modal show={showCardTool} size='sm'>
      <ModalHeader title='Bonaparte' onClose={onClose} />
      <ModalBody>
        <p className='pb-4'></p>
      </ModalBody>
    </Modal>
  )
}
