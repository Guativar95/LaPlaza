import { Button, LinkButton } from '@/components/ui/Button'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/Modal'

interface ApplicationSavedModalProps {
  show: boolean
  onClose: () => void
}

export const ApplicationSavedModal = ({ show, onClose }: ApplicationSavedModalProps) => {
  return (
    <Modal show={show}>
      <ModalHeader onClose={onClose} />
      <ModalBody>
        <p className='text-lg'>
          Tu solicitud fue guardada correctamente, recibirás un correo para que puedas continuar con
          tu solicitud.
        </p>
      </ModalBody>
      <ModalFooter>
        <div className='w-full flex justify-end gap-2'>
          <Button onClick={onClose} variant='text'>
            Continuar proceso
          </Button>
          <LinkButton to='/inicio' variant='gradient'>
            Ir al inicio
          </LinkButton>
        </div>
      </ModalFooter>
    </Modal>
  )
}
