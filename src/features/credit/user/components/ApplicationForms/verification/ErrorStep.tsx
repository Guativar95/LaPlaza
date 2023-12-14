import { IoMdAlert } from 'react-icons/io'
import { Alert } from 'flowbite-react'

export const ErrorStep = () => {
  return (
    <div role='alert'>
      <Alert
        color='failure'
        icon={() => <IoMdAlert className='hidden text-xl mr-2 md:block' />}
        additionalContent={
          <>
            <p>
              No pudimos comprobar el resultado de la verificación, por favor vuelve a intentar. Si
              sigues teniendo problemas, comunicate con nosotros para asistirte.
            </p>
          </>
        }
      >
        <h2 className='text-lg'>Hemos tenido un error</h2>
      </Alert>
    </div>
  )
}
