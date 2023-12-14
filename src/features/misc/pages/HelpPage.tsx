import { MainLayout } from '@/components/Layout'
import { ContactButton } from '@/components/ui/Contact'
import { Footer } from '@/components/ui/Footer'
import { Wrapper } from '@/components/ui/Wrapper'

import helpBanner from '../assets/images/help-banner.png'

export const HelpPage = () => {
  return (
    <MainLayout title='ayuda' className='py-0' wrapper={false}>
      <main>
        <div className='relative bg-white overflow-hidden min-h-[25rem]'>
          <img src={helpBanner} alt='' className='absolute w-full h-full inset-0 object-cover' />
          <Wrapper className='relative'>
            <h1 className='mx-3 pt-16 text-5xl text-secondary-500 '>
              Resuelve todas tus dudas <br />y lleva tu{' '}
              <span className='font-bold text-primary-700'>Carfiao</span>
            </h1>
            <p className='my-5 mx-3'>
              Le damos respuesta a todas tus inquietudes con un solo clic. <br />
            </p>
          </Wrapper>
        </div>
        <div className='bg-white bg-gradient-to-br from-transparent via-transparent '>
          <Wrapper>
            <div className='grid grid-cols-1 gab-2 w-full lg:grid-cols-1 py-4'>
              <div className='bg-contain w-full my-3 md:min-h-[20rem] mx-auto '>
                <div className='  w-4/6 justify-center items-center m-auto'>
                  <h2 className='text-primary-700 text-3xl  font-bold'>Preguntas frecuentes</h2>
                  <p className='text-left my-3 text-gray-500'>
                    Haz clic y resuelve todas las dudas que tengas sobre tu Carfiao.
                  </p>
                </div>
                <div className=' w-4/6 justify-center items-center m-auto pt-7'>
                  <p className='my-3'>¿Dónde está ubicado Carfiao?</p>
                  <hr></hr>
                  <div className='bg-gray-200 pt-5 pb-5  border-t-2 border-gray-500'>
                    <p className='text-left mx-10 text-gray-500'>
                      <b> R:</b> La tienda de Carfiao está ubicada en la dirección Av. Chía - Cajicá
                      Conj El Portal - Las Margaritas LC No 2.
                    </p>
                  </div>
                </div>
                <div className=' w-4/6 justify-center items-center m-auto pt-7'>
                  <p className='my-3 '>¿Dónde puedo ver los Carfiaos disponibles?</p>
                  <hr></hr>
                  <div className='bg-gray-200 pt-5 pb-5  border-t-2 border-gray-500'>
                    <p className='text-left mx-10 text-gray-500'>
                      <b> R:</b> Puedes conocer todos los carros que tenemos a tu disposición
                      haciendo{' '}
                      <b className='text-blue-900'>
                        <a href='/vehiculos'>clic aquí.</a>
                      </b>
                    </p>
                  </div>
                </div>
                <div className=' w-4/6 justify-center items-center m-auto pt-7'>
                  <p className='my-3'>¿Cómo puedo comprar un Carfiao a través del sitio web?</p>
                  <hr></hr>
                  <div className='bg-gray-200 pt-5 pb-5  border-t-2 border-gray-500'>
                    <p className='text-left mx-10 my-2 text-gray-500'>
                      <b> R:</b> ¡Llevar tu carro Carfiao es muy fácil!
                    </p>
                    <ul className='text-left mx-10 text-gray-500 '>
                      <li>1. Selecciona el carro que quieras de nuestro inventario disponible.</li>
                      <li>2. Ingresa los datos solicitados y continúa con el proceso de compra.</li>
                      <li>3. Una vez realizada la compra, lleva tu Carfiao o recíbelo en casa</li>
                    </ul>
                  </div>
                </div>
                <div className=' w-4/6 justify-center items-center m-auto pt-7'>
                  <p className='my-3'>¿Puedo ver los carfiaos disponibles de manera presencial?</p>
                  <hr></hr>
                  <div className='bg-gray-200 pt-5 pb-5  border-t-2 border-gray-500'>
                    <p className='text-left mx-10 text-gray-500'>
                      <b> R:</b> Sí, puedes visitar nuestra vitrina ubicada en la dirección Av.
                      Cajicá Portal de Las Margaritas LC No 2 en los siguientes horarios:.
                    </p>
                    <p className='text-left mx-10 text-gray-700'>
                      Lunes - Viernes 9:00 a.m a 6:00 p.m
                      <br />
                      Sábado 9:00 a.m a 5:00 p.m
                      <br />
                      Domingo 11:00 a.m - 4:00 pm
                    </p>
                  </div>
                </div>
                <div className=' w-4/6 justify-center items-center m-auto pt-7'>
                  <p className='my-3'>¿Puedo simular el pago de la cuota?</p>
                  <hr></hr>
                  <div className='bg-gray-200 pt-5 pb-5  border-t-2 border-gray-500'>
                    <p className='text-left mx-10 text-gray-500'>
                      <b> R:</b> Sí, puedes realizar la simulación del pago de tu cuota de cualquier
                      carro que desees ingresando en la
                    </p>
                    <p className='text-left mx-10 text-gray-500'>descripción de cada uno.</p>
                  </div>
                </div>
                <div className=' w-4/6 justify-center items-center m-auto pt-7'>
                  <p className='my-3'>¿Dónde puedo recoger mi Carfiao?</p>
                  <hr></hr>
                  <div className='bg-gray-200 pt-5 pb-5  border-t-2 border-gray-500'>
                    <p className='text-left mx-10 text-gray-500'>
                      <b> R:</b> Puedes recoger tu carro en nuestra tienda física ubicada en Av.
                      Cajicá Portal de Las Margaritas local No. 2 o te lo podemos llevar a la puerta
                      de tu casa.
                    </p>
                  </div>
                </div>
              </div>
              <div className='text-center my-4'>
                <h3 className='font-bold'>
                  Si tienes más dudas puedes contactarnos para poder asesorarte
                </h3>
                <ContactButton
                  text='Contáctanos'
                  className='rounded-lg text-1xl px-8 mt-5 bg-primary-400 hover:bg-primary-300 text-white p-2'
                />
              </div>
            </div>
          </Wrapper>
        </div>
      </main>
      <Footer />
    </MainLayout>
  )
}
