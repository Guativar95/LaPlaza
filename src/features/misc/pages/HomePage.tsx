import { Link } from 'react-router-dom'

import { MainLayout } from '@/components/Layout'
import { LinkButton } from '@/components/ui/Button'
import { Footer } from '@/components/ui/Footer'
import { VhOutlineBuy } from '@/components/ui/Icons'
import { Wrapper } from '@/components/ui/Wrapper'

import imgtwo from '../assets/images/chica.png'
import banner from '../assets/images/home-banner.png'
import whoWeAre from '../assets/images/who-we-are.jpg'

import { Benefit } from './Benefit'

export const HomePage = () => {
  return (
    <MainLayout title='Inicio' className='py-0' wrapper={false}>
      <div className='bg-white'>
        <main>
          <div className='relative overflow-hidden min-h-[25rem]'>
            <img src={banner} alt='' className='absolute w-full h-full inset-0 object-cover' />
            <Wrapper className='relative mx-5 sm:mx-40'>
              <h1 className='mx-3 pt-10 text-5xl text-secondary-500 '>
                La tienda de los carros
                <br />
                <span className='font-bold text-primary'>Financiados para todos</span>
              </h1>
              <p className='my-5 mx-3'>
                Amplia variedad de vehículos y precios. <br />
              </p>
              <LinkButton
                className='text-2xl mx-2 font-bold !rounded-full'
                color='secondary'
                to='/vehiculos'
              >
                Quiero mi Carfio
              </LinkButton>
            </Wrapper>
          </div>
          <Wrapper className='my-10'>
            <div className='flex flex-col gap-3 md:flex-row md:gap-20 md:justify-center md:items-center'>
              <div>
                <figure>
                  <img src={whoWeAre} alt='Personas sonriendo' className='mt-2 max-h-80' />
                </figure>
              </div>
              <div>
                <h2 className='text-4xl text-primary text-center font-bold mb-10'>
                  ¿Quiénes somos?
                </h2>
                <p className='max-w-md text-lg'>
                  <strong className='font-bold'>
                    ¡Somos la tienda de los carros financiados para todos!
                  </strong>{' '}
                  Un lugar en donde podrás elegir el carro que más se adapte a tus{' '}
                  <span className='font-bold'>necesidades y posibilidades</span>. Bienvenidos a una
                  nueva forma de adquirir el carro que siempre has soñado.
                </p>
              </div>
            </div>
          </Wrapper>
          <Wrapper className='my-20'>
            <div className='flex flex-col gap-3 md:flex-row md:gap-20 md:justify-center md:items-center'>
              <div>
                <h2 className='text-4xl font-bold text-primary flex items-center gap-3 mb-10'>
                  <span>Lleva tu Carfiao en un dos por tres</span>
                  <VhOutlineBuy className='mx-auto w-20 mb-5' />
                </h2>
                <h3 className='text-2xl font-bold text-gray-700'>
                  El <span className='text-secondary'>un, dos, tres</span> para salir en tu{' '}
                  <span className='text-primary-700 font-bold'> Carfiao</span>
                </h3>
                <ul className='my-5 text-lg'>
                  <li className='flex gap-2'>
                    <span className='font-bold'>1.</span>
                    <p>Selecciona el Carfiao que quieras de nuestro inventario disponible.</p>
                  </li>
                  <li className='flex gap-2'>
                    <span className='font-bold'>2.</span>
                    <p>Ingresa los datos solicitados y continúa con el proceso de compra.</p>
                  </li>
                  <li className='flex gap-2'>
                    <span className='font-bold'>3.</span>
                    <p>
                      Una vez realizada la compra de tu Carfiao ¡Listo! Lleva <br /> tu Carfiao y
                      recíbelo en tu casa.
                    </p>
                  </li>
                </ul>
                <p>
                  <LinkButton
                    className='text-md mx-2 font-bold !rounded-full'
                    color='secondary'
                    to='/vehiculos'
                  >
                    Carfiaos disponibles
                  </LinkButton>
                </p>
                <p className='pt-3'>
                  <Link to='/ayuda' className='underline text-primary-700'>
                    *Consulta las condiciones del proceso de compra de tu Carfiao aquí.
                  </Link>
                </p>
              </div>
              <div>
                <figure>
                  <img src={imgtwo} alt='carfiao' className='w-auto mx-auto rounded-md' />
                </figure>
              </div>
            </div>
          </Wrapper>

          <section className='mt-10'>
            <div className='bg-primary-200'>
              <Wrapper className='py-10'>
                <h2 className='text-4xl text-center font-bold text-white mb-10'>Beneficios</h2>
                <Benefit />
              </Wrapper>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MainLayout>
  )
}
