import { RequestTypes } from '@vehicles/common'
import { PanelCard } from '@vehicles/common/components/PanelCard'
import { PanelList } from '@vehicles/common/components/PanelList'

import { MainLayout } from '@/components/Layout'
import { Footer } from '@/components/ui/Footer'
import { Wrapper } from '@/components/ui/Wrapper'
import { useAlert } from '@/hooks/useAlerts'

import {
  CarsAdmin,
  ListAdmin,
  LocationAdmin,
  MechanicAdmin,
  ReportAdmin,
  ServiceAdmin,
  ToolsAdmin,
} from '../icons'

export const Admin = () => {
  const { data } = useAlert()

  return (
    <MainLayout title='admin' className='py-0' wrapper={false}>
      <Wrapper>
        <main>
          <h1 className='text-center text-3xl my-9'>Bienvenido al panel de control de Carfiao</h1>
          <div className='md:mx-auto md:max-w-8xl'>
            <section>
              <h2 className='text-2xl font-bold'>Vehículos</h2>
              <PanelList variant='grid'>
                <PanelCard
                  icon={<CarsAdmin className='w-24 my-3' />}
                  text='Inventario'
                  to='/vehiculos'
                  variant='grid'
                />
                <PanelCard
                  icon={<ListAdmin className='w-20 my-5' />}
                  text='Registrar'
                  to='/vehiculos/crear'
                  variant='grid'
                />
                <PanelCard
                  icon={<ListAdmin className='w-20 my-5' />}
                  text='Editar'
                  to='/vehiculos/editar'
                  variant='grid'
                />
                <PanelCard
                  icon={<ListAdmin className='w-20 my-5' />}
                  text='Valor mensual seguro'
                  to='/vehiculos/seguro'
                  variant='grid'
                />
                <PanelCard
                  icon={<ReportAdmin className='w-20 my-5' />}
                  text='Informes'
                  to='#'
                  variant='grid'
                />
              </PanelList>
            </section>
            <section className='mt-8'>
              <h2 className='text-2xl font-bold'>Solicitudes servicios</h2>
              <PanelList variant='grid'>
                <PanelCard
                  icon={<ToolsAdmin className='w-20 my-5' />}
                  text='Reparaciones'
                  to='/vehiculos/solicitudes/reparacion'
                  variant='grid'
                  hasNotifications={data?.requests[RequestTypes.repair]?.has}
                />
                <PanelCard
                  icon={<MechanicAdmin className='w-20 my-5' />}
                  text='Alistamientos'
                  to='/vehiculos/solicitudes/alistamiento'
                  variant='grid'
                  hasNotifications={data?.requests[RequestTypes.enlistment]?.has}
                />
                <PanelCard
                  icon={<LocationAdmin className='w-20 my-5' />}
                  text='GPSs'
                  to='/vehiculos/solicitudes/gps'
                  variant='grid'
                  hasNotifications={data?.requests[RequestTypes.gps]?.has}
                />
                <PanelCard
                  icon={<ServiceAdmin className='w-20 my-5' />}
                  text='Lavados'
                  to='/vehiculos/solicitudes/lavado'
                  variant='grid'
                  hasNotifications={data?.requests[RequestTypes.cleaning]?.has}
                />
              </PanelList>
            </section>
            <section className='mt-8'>
              <h2 className='text-2xl font-bold'>Créditos</h2>
              <PanelList variant='grid'>
                <PanelCard
                  icon={<ListAdmin className='w-20 my-5' />}
                  text='Solicitudes'
                  to='/creditos/solicitudes'
                  variant='grid'
                />
              </PanelList>
            </section>
          </div>
        </main>
      </Wrapper>
      <Footer className='mt-5' />
    </MainLayout>
  )
}
