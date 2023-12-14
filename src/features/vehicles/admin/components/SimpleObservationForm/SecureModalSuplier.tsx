import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type GpsModalProps = {
  setSelectedVehicleId: React.Dispatch<React.SetStateAction<string | null>>
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
}

export const SecureModalSuplier: React.FC<GpsModalProps> = ({ onClose }) => {
  // const [isLoading, setIsLoading] = useState(false)
  // const handleSubmit = async ({ description, providerId }: SimpleObservationValues) => {
  //   setIsLoading(true)
  //   const request: Request = {
  //     vehicleId,
  //     statusVehicleId: StatusVehicle.installiGps,
  //     typeRequestId: RequestTypes.gps,
  //     statusRequestId: StatusVehicle.pending,
  //     providerId,
  //     detailRequests: [
  //       {
  //         description,
  //         observations: [],
  //       },
  //     ],
  //   }
  //   try {
  //     const { status } = await createRequest(request)
  //     if (status === 200) {
  //       onClose()
  //       onSuccess && onSuccess()
  //       toast.success('EL valor fue enviado correctamente')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     toast.error('Hemos tenido problemas al enviar  el valor')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <Modal show={true} size='lg'>
      <ModalHeader title='Plan Mantenimiento Cliente' onClose={onClose} />
      <ModalBody>
        {/* <SimpleObservationSecure
          vehicleId={vehicleId}
          onSuccess={handleSubmit}
          requestType={RequestTypes.maintenance}
          isLoading={isLoading}
          setSelectedVehicleId={setSelectedVehicleId}
        /> */}
      </ModalBody>
    </Modal>
  )
}
