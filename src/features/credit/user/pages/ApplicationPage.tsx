import { Outlet } from 'react-router-dom'
import { CreditLayout } from '@credit/common'
import { Alert } from 'flowbite-react'

import { Spinner } from '@/components/ui/Spinner'

import { ApplicationForm } from '../components/NewApplicationForms'
import { RequestStatus, useApplication } from '../hooks/useApplication'
import { ApplicationStepperProvider } from '../store/ApplicationStepperContext'

import { ApplicationAssistanceModal } from './ApplicationAssistanceModal'
import { ApplicationSavedModal } from './ApplicationSavedModal'

export const ApplicationPage = () => {
  const {
    applicationId,
    vehicle,
    handleSubmit,
    handleSaveProgress,
    handleAskAssistance,
    applicationRef,
    requestStatus,
    setRequestStatus,
  } = useApplication()

  return (
    <CreditLayout title='Solicitud de vehículo'>
      <div
        className={
          [
            RequestStatus.fillingOut,
            RequestStatus.processSaved,
            RequestStatus.assistanceProcessSaved,
          ].includes(requestStatus)
            ? ''
            : 'hidden'
        }
      >
        <ApplicationStepperProvider
          applicationRef={applicationRef}
          applicationId={applicationId}
          vehicle={vehicle}
          onComplete={handleSubmit}
          onSaveProcess={handleSaveProgress}
          onAskAssistance={handleAskAssistance}
        >
          <ApplicationForm />
        </ApplicationStepperProvider>
      </div>

      {requestStatus === RequestStatus.submitting && (
        <div className='flex justify-center items-center gap-2'>
          <Spinner />
          <p>Procesando solicitud...</p>
        </div>
      )}
      {requestStatus === RequestStatus.savingProcess && (
        <div className='flex justify-center items-center gap-2'>
          <Spinner />
          <p>Estamos guardando tu solicitud...</p>
        </div>
      )}
      {requestStatus === RequestStatus.error && (
        <Alert color='failure'>
          <p>Hemos tenido problemas procesando la solicitud, por favor vuelve a intentar</p>
        </Alert>
      )}

      {requestStatus === RequestStatus.processSaved && (
        <ApplicationSavedModal show onClose={() => setRequestStatus(RequestStatus.fillingOut)} />
      )}
      {requestStatus === RequestStatus.assistanceProcessSaved && (
        <ApplicationAssistanceModal
          show
          onClose={() => setRequestStatus(RequestStatus.fillingOut)}
        />
      )}

      <Outlet />
    </CreditLayout>
  )
}
