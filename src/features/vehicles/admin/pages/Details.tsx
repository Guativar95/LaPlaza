import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getColserautoValuesByVehicleId } from '@vehicles/common/api/getColserautoValues'
import { getVehicleById } from '@vehicles/common/api/getVehicle'
import { VehicleProperties } from '@vehicles/common/components/Details/VehicleProperties'
import { DetailsGallery } from '@vehicles/common/components/DetailsGallery'
import {
  ColserautoValue,
  RequestTypes,
  StatusVehicle,
  Vehicle,
  VehicleGpsStatus,
} from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'
import { Button, LinkButton } from '@/components/ui/Button'

import { getVehicleGpsStatus } from '../api/getVehicleGpsStatus'
import { CleaningModal } from '../components/CleaningModal'
import { DesactiveFromReserveModal } from '../components/DesactiveFromReserveModal'
import { DesactiveFromShowcaseModal } from '../components/DesactiveFromShowcaseModal'
import { EnlistmentModal } from '../components/EnlistmentModal'
import { GpsModal } from '../components/GpsModal'
import { ReserverModal } from '../components/ReserverModal'
import { ShowCaseModal } from '../components/ShowCaseModal'
import { ToggleGpsModal } from '../components/ToggleGpsModal'
import {
  Concessionaire,
  ListAdmin,
  LocationAdmin,
  MechanicAdmin,
  Reserve,
  ToolsAdmin,
} from '../icons'
import { ServiceAdmin } from '../icons/ServiceAdmin'

export const Details = () => {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState({} as Vehicle)
  const [isLoading, setIsLoading] = useState(true)
  const [colserautoValues, setColserautoValues] = useState([] as ColserautoValue[])
  const [vehicleGpsStatus, setVehicleGpsStatus] = useState<VehicleGpsStatus | null>(null)

  const [showEnlistment, setShowEnlistment] = useState(false)
  const [showGps, setShowGps] = useState(false)
  const [showCleaning, setShowCleaning] = useState(false)
  const [showReserve, setShowReserve] = useState(false)
  const [showCase, setShowCase] = useState(false)
  const [showDesactiveFromShowcase, setShowDesactiveFromShowcase] = useState(false)
  const [showDesactiveFromReserve, setShowDesactiveFromReserve] = useState(false)
  const [toggleVehicleGps, setToggleVehicleGps] = useState<boolean | null>(null)

  const reloadVehicle = async () => {
    const res = await getVehicleById(id!)
    setVehicle(res.data)
  }
  const fetchDetails = async (id: string) => {
    try {
      const [vehicle, colserautoValues] = await Promise.allSettled([
        getVehicleById(id),
        getColserautoValuesByVehicleId(id),
      ])

      if (vehicle.status === 'fulfilled') {
        setVehicle(vehicle.value.data)
      } else {
        toast.error('Hemos tenido problemas obteniendo los datos del vehículo')
      }
      if (colserautoValues.status === 'fulfilled') {
        setColserautoValues(colserautoValues.value.data)
      } else {
        toast.warning('No se han encontrado datos de Colserauto')
      }

      setIsLoading(false)
    } catch (error) {}
  }

  const fetchVehicleGpsStatus = async (vehicleId: string) => {
    try {
      const { data } = await getVehicleGpsStatus({ vehicleId })
      setVehicleGpsStatus(data.name as VehicleGpsStatus)
    } catch (error) {}
  }

  useEffect(() => {
    if (!id) return

    fetchDetails(id)
    fetchVehicleGpsStatus(id)
  }, [])

  const { vehicleId, statusVehicleId } = vehicle
  const disableRequests = ![StatusVehicle.available].includes(statusVehicleId)
  const canDesactiveFromShowcase = statusVehicleId === StatusVehicle.inShowcase
  const canDesactiveFromReserve = statusVehicleId === StatusVehicle.reserved
  const disableGpsToggle =
    [
      VehicleGpsStatus.GPSNoInstalled,
      VehicleGpsStatus.ActivationProcess,
      VehicleGpsStatus.InactivationProcess,
    ].includes(vehicleGpsStatus!) ||
    [StatusVehicle.installiGps, StatusVehicle.reserved].includes(statusVehicleId)

  return (
    <MainLayout title='Detalles del vehículo' isLoading={isLoading}>
      <div className='flex flex-col gap-16 md:flex-row lg:items-start mx-3'>
        <section className='md:w-3/6 lg:w-4/6 flex flex-col gap-7'>
          <DetailsGallery vehicleId={vehicleId} />
          <VehicleProperties vehicle={vehicle} colserautoValues={colserautoValues} />
        </section>
        <section className='md:w-3/6 lg:w-2/6 justify-center'>
          <div className='md:max-w-xs lg:max-w-sm lg:mx-auto'>
            <h1 className='text-2xl text-primary-700 font-bold mb-5'>
              Qué deseas Hacer al vehículo
            </h1>
            <ul className='flex flex-col gap-1'>
              <li className='flex gap-3 items-center'>
                <ListAdmin className='w-14' />
                <LinkButton
                  variant='gradient'
                  to={`/vehiculos/editar?licencePlate=${vehicle.licencePlate}`}
                  className='!p-3 w-full'
                >
                  Editar Datos del Vehículo
                </LinkButton>
              </li>
              <li className='flex gap-3 items-center'>
                <ToolsAdmin className='w-14' />
                {disableRequests ? (
                  <Button variant='gradient' className='!p-3 w-full' disabled>
                    Cotizar Reparación
                  </Button>
                ) : (
                  <LinkButton
                    variant='gradient'
                    to={`/vehiculos/${vehicleId}/cotizacion`}
                    className='!p-3 w-full'
                  >
                    Cotizar Reparación
                  </LinkButton>
                )}
              </li>
              <li className='flex gap-3 items-center'>
                <MechanicAdmin className='mx-auto w-14' />
                <Button
                  variant='gradient'
                  className='!p-3 w-full'
                  onClick={() => setShowEnlistment(!showEnlistment)}
                  disabled={disableRequests}
                >
                  Agendar Alistamiento
                </Button>
                {showEnlistment && (
                  <EnlistmentModal
                    showEnlistment={showEnlistment}
                    vehicleId={vehicleId}
                    onClose={() => setShowEnlistment(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
              </li>
              <li className='flex gap-3 items-center'>
                <LocationAdmin className='mx-auto w-14' />
                <Button
                  variant='gradient'
                  className='!p-3 w-full'
                  onClick={() => setShowGps(!showGps)}
                  disabled={disableRequests}
                >
                  Solicitar GPS
                </Button>
                {showGps && (
                  <GpsModal
                    showGps={showGps}
                    vehicleId={vehicleId}
                    onClose={() => setShowGps(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
              </li>
              <li className='flex gap-3 items-center'>
                <ServiceAdmin className='mx-auto w-14' />
                <Button
                  variant='gradient'
                  className='!p-3 w-full'
                  onClick={() => setShowCleaning(!showCleaning)}
                  disabled={disableRequests}
                >
                  Solicitar Limpieza
                </Button>
                {showCleaning && (
                  <CleaningModal
                    showCleaning={showCleaning}
                    vehicleId={vehicleId}
                    onClose={() => setShowCleaning(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
              </li>
              <li className='flex gap-3 items-center'>
                <Reserve className='w-14' />
                <Button
                  variant='gradient'
                  className='!p-3 w-full'
                  onClick={() =>
                    canDesactiveFromReserve
                      ? setShowDesactiveFromReserve(true)
                      : setShowReserve(!showReserve)
                  }
                  disabled={disableRequests && !canDesactiveFromReserve}
                >
                  {canDesactiveFromReserve ? 'Desactivar de Reservado' : 'Activar en Reservado'}
                </Button>
                {showReserve && (
                  <ReserverModal
                    show={showReserve}
                    vehicleId={vehicleId}
                    onClose={() => setShowReserve(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
                {showDesactiveFromReserve && (
                  <DesactiveFromReserveModal
                    show={showDesactiveFromReserve}
                    vehicleId={vehicleId}
                    onClose={() => setShowDesactiveFromReserve(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
              </li>
              <li className='flex gap-3 items-center'>
                <Concessionaire className='w-14' />
                <Button
                  variant='gradient'
                  className='!p-3 w-full'
                  onClick={() => {
                    canDesactiveFromShowcase
                      ? setShowDesactiveFromShowcase(true)
                      : setShowCase(!showCase)
                  }}
                  disabled={disableRequests && !canDesactiveFromShowcase}
                >
                  {canDesactiveFromShowcase ? 'Desactivar en la Vitrina' : 'Activar en la Vitrina'}
                </Button>
                {showCase && (
                  <ShowCaseModal
                    show={showCase}
                    vehicleId={vehicleId}
                    onClose={() => setShowCase(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
                {showDesactiveFromShowcase && (
                  <DesactiveFromShowcaseModal
                    show={showDesactiveFromShowcase}
                    vehicleId={vehicleId}
                    onClose={() => setShowDesactiveFromShowcase(false)}
                    onSuccess={reloadVehicle}
                  />
                )}
              </li>
              <li className='flex gap-3 items-center'>
                <LocationAdmin className='mx-auto w-14' />
                <Button
                  variant='gradient'
                  className='!p-3 w-full'
                  onClick={() =>
                    setToggleVehicleGps(vehicleGpsStatus === VehicleGpsStatus.Inactive)
                  }
                  disabled={disableGpsToggle}
                >
                  {vehicleGpsStatus === VehicleGpsStatus.GPSNoInstalled && 'GPS no instalado'}
                  {vehicleGpsStatus === VehicleGpsStatus.ActivationProcess &&
                    'En activación de GPS'}
                  {vehicleGpsStatus === VehicleGpsStatus.InactivationProcess &&
                    'En desactivación de GPS'}
                  {vehicleGpsStatus === VehicleGpsStatus.Active && 'Desactivar GPS'}
                  {vehicleGpsStatus === VehicleGpsStatus.Inactive && 'Activar GPS'}
                </Button>
                {toggleVehicleGps !== null && (
                  <ToggleGpsModal
                    show
                    onClose={() => setToggleVehicleGps(null)}
                    onSuccess={() => fetchVehicleGpsStatus(vehicleId)}
                    requestType={
                      toggleVehicleGps ? RequestTypes.activeGPS : RequestTypes.inactiveGPS
                    }
                    statusVehicle={vehicle.statusVehicleId}
                    vehicleId={vehicleId}
                  />
                )}
              </li>
              {disableRequests && (
                <li>
                  <p className='italic mt-2 text-right'>
                    <span className='font-bold'>NOTA: </span>
                    <span>{vehicle.statusVehicle}</span>
                  </p>
                </li>
              )}
            </ul>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
