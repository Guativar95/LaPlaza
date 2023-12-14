import { LinkButton } from '@/components/ui/Button'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/ui/Modal'

interface ApplicationAssistanceModalProps {
  show: boolean
  onClose: () => void
}

export const ApplicationAssistanceModal = ({ show, onClose }: ApplicationAssistanceModalProps) => {
  return (
    <Modal show={show}>
      <ModalHeader onClose={onClose} />
      <ModalBody>
        <p className='text-lg'>
          Hemos guardado solicitud, pronto un asesor se va a comunicar contigo para ayudarte y
          continuar con la solicitud
        </p>
      </ModalBody>
      <ModalFooter>
        <div className='w-full flex justify-end gap-2'>
          <LinkButton to='/inicio' variant='gradient'>
            Ir al inicio
          </LinkButton>
        </div>
      </ModalFooter>
    </Modal>
  )
}
