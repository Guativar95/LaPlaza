import { useState } from 'react'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Applicant, CreditLayout } from '@credit/common'

import { LinkButton } from '@/components/ui/Button'
import { Modal, ModalBody } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'

import { registerGuarantor } from '../api/registerGuarantor'
import { GuarantorForm } from '../components/ApplicationForms'
import { useApplicationContext } from '../store/ApplicationContext'

enum Status {
  fillingOut,
  submitting,
  successful,
  error,
}

export const CreditGuarantorPage = () => {
  const { setVerificationData } = useApplicationContext()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const { applicationId, guarantorId } = useParams()
  const [status, setStatus] = useState(Status.fillingOut)

  const isVerified = searchParams.get('ref') === 'manual_verification'

  const onSuccess = async (values: Applicant) => {
    setStatus(Status.submitting)
    try {
      const { data } = await registerGuarantor({
        requestCode: applicationId!,
        guarantorData: values,
        guarantorId: Number(guarantorId),
      })

      if (typeof data === 'object') {
        setStatus(Status.fillingOut)
        setVerificationData(data)
        navigate('evidente', { replace: true })
        return
      }

      setStatus(Status.successful)
    } catch (error) {
      setStatus(Status.error)
      toast.error('Hemos tenido problemas haciendo el registro')
    }
  }

  if (!applicationId || !guarantorId) return null

  return (
    <CreditLayout title='Verificación avalista'>
      {status === Status.submitting && (
        <div className='flex justify-center items-center gap-2'>
          <Spinner />
          <p>Comprobando información...</p>
        </div>
      )}
      <div className={status === Status.submitting ? 'hidden' : ''}>
        <GuarantorForm
          applicationId={applicationId}
          guarantorId={Number(guarantorId)}
          isVerified={isVerified}
          onSuccess={onSuccess}
        />
      </div>
      {status === Status.successful && (
        <Modal show>
          <ModalBody>
            <h2 className='text-2xl text-secondary font-bold'>Registro de avalista exitoso</h2>
            <div className='flex justify-end mt-5'>
              <LinkButton to='/inicio' replace variant='gradient'>
                Ir al inicio
              </LinkButton>
            </div>
          </ModalBody>
        </Modal>
      )}

      <Outlet />
    </CreditLayout>
  )
}
