import { useEffect, useId, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getVehicleById } from '@vehicles/common/api/getVehicle'
import { Request, RequestTypes, StatusVehicle, Vehicle } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

import { createRequest } from '../api/createRequest'
import { EstimateFormModal } from '../components/EstimateFormModal'
import { RepairForm, RepairValues } from '../components/RepairForm'
import { useRepairContext } from '../store/RepairContext'

export const RepairQuote = () => {
  const { fetchEstimates } = useRepairContext()
  const formId = useId()

  const quoteIndex = useRef(0)
  const navigate = useNavigate()
  const { id } = useParams()
  const [vehicle, setVehicle] = useState({} as Vehicle)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSibmitted] = useState(false)
  const [showEstimateModal, setShowEstimateModal] = useState(false)

  const [dynamicFormId, setDynamicFormId] = useState(`${formId}-${quoteIndex.current}`)

  useEffect(() => {
    ;(async () => {
      const res = await getVehicleById(id!)
      setVehicle(res.data)
    })()
  }, [])

  const { vehicleId } = vehicle

  const handleReset = () => {
    const nextIndex = quoteIndex.current + 1
    setDynamicFormId(`${formId}-${nextIndex}`)
    setIsSibmitted(false)
    quoteIndex.current = nextIndex
  }

  const handleSubmit = async (data: RepairValues) => {
    setIsLoading(true)

    const request: Request = {
      vehicleId,
      statusVehicleId: StatusVehicle.inPreparation,
      typeRequestId: RequestTypes.repair,
      statusRequestId: StatusVehicle.pendingQuotation,
      providerId: data.providerId,
      detailRequests: data.items.map(({ estimationTypeId, description }) => ({
        typeEstimateId: estimationTypeId,
        description,
        observations: [],
      })),
    }

    try {
      const { status, statusText } = await createRequest(request)
      if (status === 200) {
        toast.success('Se enviaron los requerimientos correctamente')
        setIsSibmitted(true)
      } else {
        throw new Error(statusText)
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido Problemas al enviar los requerimientos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout title='Crear cotización'>
      <Card className='flex flex-col items-center'>
        <section className='w-full max-w-7xl'>
          <header className='w-full'>
            <h1 className='text-2xl text-primary-700 font-bold'>
              Cotización reparación de Vehículo
            </h1>
            <p className='text-xl text-primary-900 font-bold'>
              {vehicle.licencePlate} -{vehicle.brand}
            </p>

            <div className='mt-5'>
              <p className='bg-purple-200 text-center rounded-lg p-1'>Requerimientos</p>
            </div>
          </header>
          <div className='mt-5'>
            <div className='flex justify-end'>
              <Button
                variant='text'
                aria-label='Agregar tipo estimación'
                onClick={() => setShowEstimateModal(true)}
              >
                <AiOutlinePlus />
              </Button>
            </div>

            <RepairForm
              key={dynamicFormId}
              formId={formId}
              onSuccess={handleSubmit}
              readonly={isLoading || isSubmitted}
            />

            <div className='flex justify-end gap-2 my-5'>
              {isSubmitted ? (
                <>
                  <Button color='light' onClick={() => navigate(-1)}>
                    Volver
                  </Button>
                  <Button color='secondary' onClick={() => handleReset()}>
                    Reiniciar
                  </Button>
                </>
              ) : (
                <Button type='submit' form={formId} isLoading={isLoading} disabled={isLoading}>
                  Enviar cotización
                </Button>
              )}
            </div>
          </div>
        </section>
      </Card>

      <EstimateFormModal
        show={showEstimateModal}
        onSuccess={() => {
          fetchEstimates()
          setShowEstimateModal(false)
        }}
        onClose={() => setShowEstimateModal(false)}
      />
    </MainLayout>
  )
}
