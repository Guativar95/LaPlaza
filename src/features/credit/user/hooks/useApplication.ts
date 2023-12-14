import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Application, ApplicationProgress } from '@credit/common'

import { Vehicle } from '@/features/vehicles/common'
import { getVehicleById } from '@/features/vehicles/common/api/getVehicle'
import { buildParams } from '@/utils/url'

import { createApplication } from '../api/createApplication'
import { saveApplicationProgress, saveApplicationProgressForAssistance } from '../api/saveProgress'
import { ApplicationRefs } from '../components/NewApplicationForms'
import { useApplicationContext } from '../store/ApplicationContext'

export type SimpleVehicle = Pick<
  Vehicle,
  'vehicleId' | 'grossValue' | 'initialFee' | 'line' | 'brand'
>
export enum RequestStatus {
  fillingOut,
  submitting,
  error,
  savingProcess,
  processSaved,
  assistanceProcessSaved,
}

export const useApplication = () => {
  const navigate = useNavigate()
  const { vehicleId: vehicleIdFromParams = '' } = useParams()

  const { application, handleApplicationResponse } = useApplicationContext()
  const [vehicle, setVehicle] = useState<SimpleVehicle>({} as SimpleVehicle)
  const [requestStatus, setRequestStatus] = useState(RequestStatus.fillingOut)

  const [searchParams] = useSearchParams()

  const refParam = searchParams.get('ref')?.toLowerCase()

  const applicationRef =
    refParam && (<any>Object).values(ApplicationRefs).includes(refParam)
      ? (refParam as ApplicationRefs)
      : undefined

  /**
   * @deprecated use applicationRef instead of this
   */
  const isVerificated = searchParams.get('ref') === 'manual_verification'

  const handleSubmit = async (application: Application) => {
    setRequestStatus(RequestStatus.submitting)

    try {
      const { data: res } = await createApplication(application)

      handleApplicationResponse(res)
      setRequestStatus(RequestStatus.fillingOut)
    } catch (error) {
      console.error(error)
      setRequestStatus(RequestStatus.error)
    }
  }

  const handleSaveProgress = async (application: ApplicationProgress) => {
    setRequestStatus(RequestStatus.savingProcess)
    try {
      await saveApplicationProgress(application)
      setRequestStatus(RequestStatus.processSaved)
    } catch (error) {
      console.error(error)
      setRequestStatus(RequestStatus.fillingOut)
      toast.error('Hemos tenido problemas guardando tu solicitud, vuelve a intentar')
    }
  }

  const handleAskAssistance = async (application: ApplicationProgress) => {
    setRequestStatus(RequestStatus.savingProcess)
    try {
      await saveApplicationProgressForAssistance(application)
      setRequestStatus(RequestStatus.assistanceProcessSaved)
    } catch (error) {
      console.error(error)
      setRequestStatus(RequestStatus.fillingOut)
      toast.error('Hemos tenido problemas guardando tu solicitud, vuelve a intentar')
    }
  }

  const onVehicleNotFound = () =>
    navigate(`/404?${buildParams({ message: 'Vehículo no encontrado' })}`, { replace: true })

  useEffect(() => {
    if (!vehicleIdFromParams) return onVehicleNotFound()
    ;(async () => {
      try {
        const { status, data } = await getVehicleById(vehicleIdFromParams)

        if (status !== 200) throw new Error('Otro error')

        const { vehicleId, grossValue, initialFee, line, brand } = data

        setVehicle({
          grossValue,
          initialFee,
          vehicleId,
          line,
          brand,
        })
      } catch (error: any) {
        const status = error?.response?.status

        if (status === 404 || status === 400) {
          return onVehicleNotFound()
        }
      }
    })()
  }, [])

  return {
    applicationRef,
    requestStatus,
    applicationId: application.id,
    vehicle,
    isVerificated,
    handleSubmit,
    handleSaveProgress,
    handleAskAssistance,
    setRequestStatus,
  }
}
