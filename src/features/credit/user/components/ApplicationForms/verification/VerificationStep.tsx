import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { getVerificationStatusById } from '@credit/user/api/getVerificationStatus'
import gmailPhone from '@credit/user/assets/images/svg/icon_gmail-phone.svg'
import id from '@credit/user/assets/images/svg/icon_id.svg'
import idVerification from '@credit/user/assets/images/svg/icon_image.svg'
import { VerificationStatus } from '@credit/user/types'

import { Button } from '@/components/ui/Button'
import { Modal, ModalFooter } from '@/components/ui/Modal'
import { ModalBody } from '@/components/ui/Modal/ModalBody'
import { Spinner } from '@/components/ui/Spinner'

import { MatiVerificationButton } from '../../MatiVerificationButton'
import { TermsAndConditions } from '../../TermsAndConditionsModal'

export interface VerificationStepProps {
  applicationCode: string
  onFinishVerification: (status: VerificationStatus) => void
  onErrorVerification: () => void
  metadata?: Record<string, unknown>
}

// TODO: Time limit to verification
export const VerificationStep = ({
  applicationCode,
  onFinishVerification,
  onErrorVerification,
  metadata,
}: VerificationStepProps) => {
  const metadataRef = useRef({
    id: applicationCode,
    fixedLanguage: 'es',
    ...metadata,
  })

  const intervalIdRef = useRef<ReturnType<typeof setInterval>>()

  const [showTerms, setShowTerms] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [isVerificating, setIsVerificating] = useState(false)
  const [checkTerms, setCheckTerms] = useState(false)

  const checkVerificationStatus = async () => {
    try {
      const res = await getVerificationStatusById(applicationCode, metadata)
      const status = res.data

      if (status === VerificationStatus.processing) {
        return
      }

      removeVerificationInterval()
      onFinishVerification(status)
    } catch (error) {
      removeVerificationInterval()
      onErrorVerification()
      toast.error('Hemos tenido problemas comprobando la verificación, por favor intenta más tarde')
    }
  }
  const removeVerificationInterval = () => {
    clearInterval(intervalIdRef.current)
  }

  const handleExit = () => setShowVerification(true)
  const handleFinish = () => {
    setIsVerificating(true)
    removeVerificationInterval()
    intervalIdRef.current = setInterval(checkVerificationStatus, 5000)
  }

  useEffect(() => {
    return () => removeVerificationInterval()
  }, [])

  return (
    <>
      {isVerificating ? (
        <div className='flex items-center gap-2'>
          <Spinner size='md' />
          <p className='text-lg'>
            Estamos verificando tu identidad, esto no debería tardar mucho...
          </p>
        </div>
      ) : (
        <div className='mx-7'>
          <div className='flex flex-col-reverse md:flex-row md:items-center'>
            <div>
              <p className='text-xl mb-8 pt-2'>
                Hola, vamos a iniciar el proceso para tu{' '}
                <span className='text-2xl font-harabara-mais-demo text-secondary-500'>Car</span>
                <span className='text-2xl font-harabara-mais-demo text-primary'>fiao</span>
              </p>
              <p className='text-xl font-itc-avant-garde-gothic-demi text-secondary-500 mb-8'>
                Ayúdanos a conocerte un poco más
              </p>
              <p className='text-xl mb-12'>
                Antes de iniciar con el proceso de verificación <br></br>ten en cuenta lo siguiente:
              </p>
              <div className='grid grid-cols-2'>
                <div className='flex'>
                  <figure className='max-w-sm md:max-w-xl lg:max-w-md'>
                    <img src={id} alt='Verificación de datos' className='w-12' />
                  </figure>
                  <p className='pl-2'>
                    Debes tener tu documento <br></br>de identidad a la mano.
                  </p>
                </div>
                <div className='flex'>
                  <figure className='max-w-sm md:max-w-xl lg:max-w-md'>
                    <img src={gmailPhone} alt='Celular correo' className='w-12' />
                  </figure>
                  <p className='pl-2'>
                    Debes tener acceso a tu <br></br>teléfono celular y correo electrónico.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <figure className='mx-auto max-w-sm md:max-w-xl lg:max-w-md'>
                <img src={idVerification} alt='Verificación de datos' className='w-full' />
              </figure>
            </div>
          </div>

          <div className='flex flex-col gap-3 md:items-center mt-10'>
            <div className='flex items-start gap-2 pt-4'>
              <input
                type='checkbox'
                checked={checkTerms}
                onChange={() => setCheckTerms(!checkTerms)}
                className='rounded-sm border-gray-300 mt-1'
              />
              <p>
                Acepto{' '}
                <Button variant='link' onClick={() => setShowTerms(true)} className='text-left'>
                  Términos y Condiciones de autorización de datos.
                </Button>
              </p>
            </div>

            <MatiVerificationButton
              metadata={metadataRef.current}
              onExit={handleExit}
              onFinish={handleFinish}
              className='text-xl'
              disabled={!checkTerms}
            />
          </div>
        </div>
      )}

      <TermsAndConditions show={showTerms} onAccept={() => setShowTerms(false)} />
      <Modal show={showVerification}>
        <ModalBody>
          <p className='text-xl'>
            Debes completar la verificación para continuar el proceso de solicitud
          </p>
        </ModalBody>
        <ModalFooter>
          <div className='w-full flex justify-end gap-3'>
            <Button color='light' onClick={() => setShowVerification(false)}>
              Cerrar
            </Button>
            <MatiVerificationButton
              metadata={metadataRef.current}
              onFinish={handleFinish}
              onExit={handleExit}
              onClick={() => setShowVerification(false)}
            />
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}
