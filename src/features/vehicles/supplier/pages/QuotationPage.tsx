import { useEffect, useId, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DetailRequest, RequestResponse, RequestTypes, StatusVehicle } from '@vehicles/common'
import { getRequests } from '@vehicles/common/api/getRequests'
import { updateRequest, UpdateRequestDTO } from '@vehicles/common/api/updateRequest'

import { MainLayout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'

import { uploadDetailRequestImages } from '../api/uploadDetailRequestImages'
import { ConfirmServiceModal } from '../components/ConfirmServiceModal'
import { AttatchmentValues, QuotationsForm, QuotationsValues } from '../components/QuotationsForm'
import { ScheduleModal } from '../components/ScheduleModal'

export const QuotationPage = () => {
  const id = useId()
  const { id: requestId } = useParams()
  const navigate = useNavigate()

  const [request, setRequest] = useState<RequestResponse>()

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false)

  const [showSchedule, setShowSchedule] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const uploadRequestImages = async (attatchments: AttatchmentValues[]) => {
    try {
      const newRequest = await getRequestById(requestId!)

      if (newRequest) {
        const promises = attatchments.map(({ images, index }) => {
          const detailRequest = newRequest.detailRequests[index]

          const form = new FormData()
          form.append('DetailRequestId', String(detailRequest.id))
          images.forEach((image) => {
            form.append('Files', image)
          })

          return uploadDetailRequestImages(form)
        })

        await Promise.all(promises)
      } else {
        throw new Error('Not found')
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas cargando las imagenes')
    }
  }

  const saveQuote = async ({ quotation }: QuotationsValues) => {
    if (!request) return

    setIsSubmittingQuote(true)
    const data: UpdateRequestDTO = {
      ...request,
      statusRequestId: StatusVehicle.quoted,
      detailRequests: quotation.map(
        ({ description, observation, total, endDate, startDate, taxes }, i) => {
          const detailRequest: DetailRequest = request.detailRequests[i] ?? {
            requestId: request.id,
            typeEstimateId: Number(description),
            description: '',
          }

          return {
            ...detailRequest,
            value: total,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            taxes: taxes.map((tax) => ({
              ...tax,
              detailRequestId: detailRequest.id!,
              name: '',
              id: 0,
            })),
            observations: [
              {
                value: observation,
                detailRequestId: detailRequest.id!,
                statusVehicleId: request.statusRequestId,
              },
            ],
          }
        }
      ),
    }

    try {
      await updateRequest(data)
      const attatchments = quotation
        .filter((q) => q.attatchment !== null)
        .map((q) => q.attatchment!)

      if (attatchments.length > 0) {
        await uploadRequestImages(attatchments)
      }

      toast.success('Cotización enviada')
      loadRequest()
    } catch (error) {
      toast.error('Hemos tenido problemas enviando la cotización')
    } finally {
      setIsSubmittingQuote(false)
    }
  }

  const getRequestById = async (requestId: string) => {
    const { data: res } = await getRequests({ typeRequestId: RequestTypes.repair, requestId })
    if (res.count > 0) return res.data[0]
  }

  const loadRequest = async () => {
    try {
      const request = await getRequestById(requestId!)
      if (request) {
        setRequest(request)
      } else {
        throw new Error('No existe la solicitud')
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(error.response.data.Message)
      } else {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRequest()
  }, [])

  const canSaveQuote = [StatusVehicle.pendingQuotation, StatusVehicle.agendaQuotation].includes(
    request?.statusRequestId!
  )
  const canSchedule =
    [StatusVehicle.pendingQuotation, StatusVehicle.pending].includes(request?.statusRequestId!) ||
    ([StatusVehicle.agendaQuotation, StatusVehicle.scheduled].includes(request?.statusRequestId!) &&
      new Date(request?.scheduledDate!).getTime() < new Date().getTime())
  const canConfirm = [StatusVehicle.pending, StatusVehicle.scheduled].includes(
    request?.statusRequestId!
  )

  const scheduleType = [StatusVehicle.pending, StatusVehicle.scheduled].includes(
    request?.statusRequestId!
  )
    ? StatusVehicle.scheduled
    : StatusVehicle.agendaQuotation

  return (
    <MainLayout title='Cotización de reparación' isLoading={isLoading}>
      {request && (
        <>
          <div>
            <h1 className='text-2xl text-primary font-bold'>Solicitud N. {requestId}</h1>
            <QuotationsForm
              formId={id}
              requests={request!.detailRequests}
              onSuccess={saveQuote}
              disabled={!canSaveQuote}
              allowAddQuotation={canSaveQuote}
            />
            <div className='flex justify-between gap-2'>
              <Button onClick={() => navigate(-1)} color='light'>
                Volver
              </Button>
              <div className='flex gap-2'>
                {canSchedule && (
                  <Button color='secondary' onClick={() => setShowSchedule(true)}>
                    Agendar visita
                  </Button>
                )}
                {canSaveQuote && (
                  <Button
                    type='submit'
                    form={id}
                    color='tertiary'
                    isLoading={isSubmittingQuote}
                    disabled={isSubmittingQuote}
                  >
                    Enviar cotización
                  </Button>
                )}
                {canConfirm && (
                  <Button color='secondary' onClick={() => setShowConfirm(true)}>
                    Terminar servicio
                  </Button>
                )}
              </div>
            </div>
          </div>

          {showSchedule && (
            <ScheduleModal
              show
              onClose={() => setShowSchedule(false)}
              onSuccess={loadRequest}
              request={{
                ...request,
                statusRequestId: scheduleType,
              }}
            />
          )}
          {showConfirm && (
            <ConfirmServiceModal
              show
              onClose={() => setShowConfirm(false)}
              onSuccess={loadRequest}
              request={request!}
            />
          )}
        </>
      )}
    </MainLayout>
  )
}
