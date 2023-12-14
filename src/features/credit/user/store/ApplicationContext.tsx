import { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import {
  ApplicationStatus,
  ApprovedOption,
  CreditResponse,
  CreditStatusResponse,
  VerificationData,
} from '@credit/common'

import { getApplicationStatus } from '../api/getApplicationStatus'

import { ApplicationContextValues, ApplicationState } from './types'

const ApplicationContext = createContext<ApplicationContextValues>({} as ApplicationContextValues)

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationProvider = () => {
  const values = useApplicationProvider()

  return (
    <ApplicationContext.Provider value={values}>
      <Outlet />
    </ApplicationContext.Provider>
  )
}

function useApplicationProvider(): ApplicationContextValues {
  const navigate = useNavigate()
  const { applicationId, vehicleId: vehicleIdFromProps = '', guarantorId = '' } = useParams()

  const [application, setApplication] = useState<ApplicationState>({
    id: applicationId!,
    guarantors: [],
    status: 'loading',
    vehicleId: vehicleIdFromProps,
  })
  const [approvedOptions, setApprovedOptions] = useState<ApprovedOption[]>([])
  const [initialPayment, setInitialPayment] = useState(0)
  const [verificationData, setVerificationData] = useState<VerificationData>({} as VerificationData)

  const setApplicationStatus = (status: ApplicationStatus) => {
    setApplication((a) => ({ ...a, status }))
  }

  const handleApplicationResponse = (res: CreditStatusResponse | CreditResponse) => {
    'vehicleId' in res
      ? setApplication((a) => ({ ...a, vehicleId: res.vehicleId, status: res.status }))
      : setApplicationStatus(res.status)

    const vehicleId = 'vehicleId' in res ? res.vehicleId : vehicleIdFromProps

    const baseUrl = `/creditos/${application.id}`
    switch (res.status) {
      case ApplicationStatus.rejectedWithOptions: {
        const { suggestedInitialFee } = res.data
        setInitialPayment(suggestedInitialFee)
        navigate(`${baseUrl}/${vehicleId}/alternativas`, {
          replace: true,
        })
        break
      }
      case ApplicationStatus.continue: {
        navigate(`${baseUrl}/continuar`, { replace: true })
        break
      }
      case ApplicationStatus.approved: {
        setApprovedOptions(res.data.fees)
        navigate(`${baseUrl}/aprobado`, { replace: true })
        break
      }
      case ApplicationStatus.rejected: {
        navigate(`${baseUrl}/rechazado`, { replace: true })
        break
      }
      case ApplicationStatus.verificationRequired: {
        setVerificationData(res.data)
        navigate(`${baseUrl}/${application.vehicleId}/evidente`, { replace: true })
        break
      }
      case ApplicationStatus.canceled:
      case ApplicationStatus.inProcess:
      case ApplicationStatus.delivered:
      case ApplicationStatus.signed:
      case ApplicationStatus.waitingForSignature:
        navigate('/vehiculos')
        break
    }
  }

  const loadApplication = async () => {
    try {
      const { data } = await getApplicationStatus(application.id)

      if (!guarantorId) {
        handleApplicationResponse(data)
      } else {
        // TODO: check guarantor url
      }
    } catch {
      setApplication((a) => ({ ...a, status: 'notCreated' }))
      // if (vehicleId) {
      //   navigate(`/creditos/${applicationId}/${vehicleId}/evidente`, { replace: true })
      // } else {
      //   navigate('/vehiculos', { replace: true })
      // }
    }
  }

  useEffect(() => {
    if (!applicationId) return navigate('/404')
    loadApplication()
  }, [])

  return {
    application,
    approvedOptions,
    initialPayment,
    verificationData,
    handleApplicationResponse,
    setVerificationData,
  }
}
