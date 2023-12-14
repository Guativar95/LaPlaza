import { IoMdAlert } from 'react-icons/io'
import { Alert } from 'flowbite-react'

export const RejectedStep = () => {
  return (
    <div role='alert'>
      <Alert color='failure' icon={() => <IoMdAlert className='hidden text-4xl mr-3 md:block' />}>
        <h2 className='text-lg mb-2'>Lo sentimos, no pudimos verificar tu identidad</h2>
        <p>
          Por favor vuelve a intentar y si tienes dudas, comunicate con uno de nuestros asesores
          para obtener ayuda
        </p>
      </Alert>
    </div>
  )
}
