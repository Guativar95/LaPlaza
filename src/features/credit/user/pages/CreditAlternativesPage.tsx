import { Outlet, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import { MainLayout } from '@/components/Layout'
import { Button, LinkButton } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

import { cancelApplication } from '../api/cancelApplication'
import imgCard from '../assets/images/fondo.png'
import { useApplicationContext } from '../store/ApplicationContext'

export const CreditAlternativesPage = () => {
  const navigate = useNavigate()
  const { initialPayment, application } = useApplicationContext()

  const hasInitialPayment = initialPayment > 0

  const handleCancel = () => {
    cancelApplication({ code: application.id })
    navigate('/')
  }

  return (
    <MainLayout title='Ajustamos la cuota inicial'>
      <main>
        <Card className='w-9/12 mx-auto'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-around'>
            <div className='flex justify-center lg:hidden'>
              <img src={imgCard} alt='seleccionar opción' />
            </div>
            <div>
              <h1 className='text-3xl font-harabara-mais-demo text-secondary text-center mb-5'>
                ¡Ajustamos la cuota inicial para <br />
                que te lleves tu Carfiao!
              </h1>
              <p className='text-center'>
                La solicitud inicial no fue aprobada pero ¡no te preocupes! <br />
                A continuación te brindamos las siguientes opciones <br />
                para que te lleves tu <span className='text-purple-800 font-bold'>Carfiao.</span>
              </p>
              <p className='text-secondary  mt-3'>
                Selecciona la opción que más se ajuste a tu bolsillo:
              </p>
              <div className='grid lg:grid-cols-2 gap-1 my-3  font-bold'>
                <LinkButton
                  to={hasInitialPayment ? 'cuota-inicial' : ''}
                  className={clsx('px-2 py-3', !hasInitialPayment && '!opacity-70 cursor-default')}
                  {...(!hasInitialPayment && { 'aria-disabled': true })}
                >
                  Ajustar cuota inicial
                </LinkButton>
                <LinkButton to='avalistas' className='px-2 py-3'>
                  Agregar avalistas
                </LinkButton>

                <LinkButton to='vehiculos' className='px-2 py-3'>
                  Ver otros vehículos similares
                </LinkButton>
                <Button onClick={handleCancel} className='px-2 py-3'>
                  Cancelar
                </Button>
              </div>
            </div>
            <div className='hidden lg:block'>
              <img src={imgCard} alt='seleccionar opción' />
            </div>
          </div>
        </Card>
        <Outlet />
      </main>
    </MainLayout>
  )
}
