import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RequestResponse, RequestTypes, StatusVehicle } from '@vehicles/common'
import { getRequests } from '@vehicles/common/api/getRequests'
import { updateRequest, UpdateRequestDTO } from '@vehicles/common/api/updateRequest'

import { CheckboxField } from '@/components/Form'
import { MainLayout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { ImagesGallery } from '@/components/ui/ImagesGallery'
import { ModalConfirm } from '@/components/ui/Modal'
import { Role } from '@/features/auth'
import { useAuth } from '@/lib/auth'
import { formatCurrency } from '@/utils/format'

// import { getConfiguration } from '../api/getConfiguration'

// const VTA_KEY = 'IvaRequest'

export const QuotationPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false)
  const [showRejectConfirm, setShowRejectConfirm] = useState(false)
  const [request, setRequest] = useState<RequestResponse>()
  const [selectedRepairs, setSelectedRepairs] = useState<{ checked: boolean; value: number }[]>([])

  const getRequestById = async (requestId: string) => {
    const { data: res } = await getRequests({ typeRequestId: RequestTypes.repair, requestId })
    return res.data?.[0]
  }

  const onChangeSelection = ({ index, checked }: { index: number; checked: boolean }) => {
    const selectedRepairsCopy = [...selectedRepairs]
    selectedRepairsCopy[index] = { ...selectedRepairsCopy[index], checked }
    setSelectedRepairs(selectedRepairsCopy)
  }

  const rejectQuotantion = async () => {
    if (!request) return

    const data: UpdateRequestDTO = {
      ...request,
      statusRequestId: StatusVehicle.rejected,
      detailRequests: request.detailRequests.map((detail) => ({
        ...detail,
        acepted: false,
      })),
    }

    try {
      const { status, statusText } = await updateRequest(data)
      if (status === 200) {
        toast.success('Cotización rechazada')
        loadRequest()
      } else {
        throw new Error(statusText)
      }
    } catch (error) {
      toast.error('Hemos tenido problemas rechazando la cotización')
    }
  }

  const acceptQuotation = async () => {
    if (!request) return

    const data: UpdateRequestDTO = {
      ...request,
      statusRequestId: StatusVehicle.pending,
      total,
      detailRequests: selectedRepairs.map(({ checked }, i) => ({
        ...request.detailRequests[i],
        acepted: checked,
      })),
    }

    try {
      const { status, statusText } = await updateRequest(data)
      if (status === 200) {
        toast.success('Cotización confirmada')
        loadRequest()
      } else {
        throw new Error(statusText)
      }
    } catch (error) {
      toast.error('Hemos tenido problemas confirmando la cotización')
    }
  }

  const loadRequest = async () => {
    try {
      const request = await getRequestById(id!)

      if (request) {
        setRequest(request)
        setSelectedRepairs(
          request.detailRequests.map(({ value, acepted }) => ({
            checked: acepted ?? true,
            value: value!,
          }))
        )
      }
    } catch (error) {
      toast.error('Hemos tenido problemas obteniendo la solicitud')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRequest()
  }, [])

  const canAcceptQuotation = useMemo(() => {
    return (
      request?.statusRequestId === StatusVehicle.quoted && user?.roleName === Role.Administrator
    )
  }, [request, user])

  const selectedCount = useMemo(() => {
    let count = 0
    selectedRepairs.forEach(({ checked }) => {
      count += checked ? 1 : 0
    })

    return count
  }, [selectedRepairs])

  const total = useMemo(() => {
    let sum = 0
    selectedRepairs.forEach(({ checked, value }) => {
      sum += checked ? value : 0
    })

    return sum
  }, [selectedRepairs])

  return (
    <MainLayout title='Cotización' isLoading={isLoading}>
      {request && (
        <>
          <table className='table w-full'>
            <thead className='bg-white'>
              <th />
              <th />
              <th className='text-primary text-xl'>Valor</th>
              <th className='text-primary text-xl'>Fecha inicio</th>
              <th className='text-primary text-xl'>Fecha fin</th>
              <th className='text-primary text-xl'>Observaciones</th>
            </thead>
            <tbody className='w-full'>
              {request.detailRequests.map(
                (
                  {
                    id,
                    description,
                    typeEstimate,
                    value,
                    observations,
                    acepted,
                    images,
                    startDate,
                    endDate,
                  },
                  i
                ) => (
                  <React.Fragment key={id!}>
                    <tr className='table-row bg-white'>
                      <td className='w-1/12 p-2 text-center'>
                        <CheckboxField
                          className='mt-0'
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onChangeSelection({ index: i, checked: e.target.checked })
                          }
                          disabled={!canAcceptQuotation}
                          defaultChecked={acepted ?? true}
                        />
                      </td>
                      <td className='w-3/12 p-2 table-cell'>
                        <p>{typeEstimate}</p>
                        <p className='text-gray-500'>{description}</p>
                      </td>
                      <td className='w-2/12 p-2'>
                        <p className='bg-primary/20 p-2 rounded-md'>{formatCurrency(value!)}</p>
                      </td>
                      <td className='w-1/12 p-2 table-cell text-center'>
                        <p className='shadow min-h-[2.5rem] p-2 rounded-md'>
                          {startDate ? new Date(startDate).toLocaleDateString() : '--'}
                        </p>
                      </td>
                      <td className='w-1/12 p-2 table-cell text-center'>
                        <p className='shadow min-h-[2.5rem] p-2 rounded-md'>
                          {endDate ? new Date(endDate).toLocaleDateString() : '--'}
                        </p>
                      </td>
                      <td className='w-3/12 p-2'>
                        <p className='shadow min-h-[2.5rem] p-2 rounded-md'>
                          {observations?.[0]?.value ? (
                            observations?.[0]?.value
                          ) : (
                            <span className='italic text-gray-400'>Sin observación</span>
                          )}
                        </p>
                      </td>
                    </tr>
                    {images && images.length > 0 && (
                      <tr className='table-row bg-white'>
                        <td colSpan={10} className='px-12'>
                          <details>
                            <summary className='select-none'>Ver imagenes</summary>
                            <div className='bg-gray-50 rounded-md'>
                              <ImagesGallery
                                images={images.map(({ route, name }) => ({
                                  src: route,
                                  alt: name,
                                }))}
                              />
                            </div>
                            <hr className='my-2' />
                          </details>
                        </td>
                      </tr>
                    )}
                    <tr></tr>
                  </React.Fragment>
                )
              )}
              <tr className='bg-white'>
                <td />
                <td className='text-center'>
                  <p className='py-4 text-2xl'>Total</p>
                </td>
                <td className='px-2'>
                  <p className='bg-primary/20 p-2 rounded-md'>{formatCurrency(total)}</p>
                </td>
                <td colSpan={3} />
              </tr>
            </tbody>
          </table>

          <div className='flex justify-between my-4'>
            <Button onClick={() => navigate(-1)} color='light'>
              Volver
            </Button>
            <div className='flex gap-2'>
              {canAcceptQuotation && (
                <>
                  <Button color='danger' onClick={() => setShowRejectConfirm(true)}>
                    Rechazar cotización
                  </Button>
                  <Button color='secondary' onClick={() => setShowAcceptConfirm(true)}>
                    Aceptar cotización
                  </Button>
                </>
              )}
            </div>
          </div>

          {showAcceptConfirm && (
            <ModalConfirm
              show
              onAccept={() => {
                setShowAcceptConfirm(false)
                acceptQuotation()
              }}
              onReject={() => setShowAcceptConfirm(false)}
              title={`¿Está seguro de continuar con la selección actual (${selectedCount})?`}
            />
          )}

          {showRejectConfirm && (
            <ModalConfirm
              show
              onAccept={() => {
                setShowRejectConfirm(false)
                rejectQuotantion()
              }}
              onReject={() => setShowRejectConfirm(false)}
              title={`¿Está seguro de rechazar la cotización?`}
            />
          )}
        </>
      )}
    </MainLayout>
  )
}
