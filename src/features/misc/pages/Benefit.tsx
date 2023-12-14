import { useState } from 'react'
import { BsQuestionLg } from 'react-icons/bs'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'
import { Wrapper } from '@/components/ui/Wrapper'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

import homeDelivery from '../assets/images/benefits/home-delivery.jpg'
import insurance from '../assets/images/benefits/insurance.jpg'
import onlineShopping from '../assets/images/benefits/online-shopping.jpg'
import supportAndAdvice from '../assets/images/benefits/support-and-advice.jpg'
import upToDateDocuments from '../assets/images/benefits/up-to-date-documents.jpg'
import wideRange from '../assets/images/benefits/wide-range.jpg'

import 'swiper/css'

const benefitsItems = [
  {
    src: onlineShopping,
    label: 'Compra en línea con financiación el mismo día.',
    textClassName: 'text-white',
    modal: {
      title: 'Compra en linea',
      description:
        'La aprobación de tu crédito está sujeta a las políticas de crédito de la entidad financiera alidada.',
    },
  },
  {
    src: homeDelivery,
    label: 'Entregamos tu Carfiao a domicilio.',
    textClassName: 'text-primary',
    modal: {
      title: 'Compra en linea',
      description:
        'Para que ésto se efectúe, tu vehículo debe estar totalmente pago o tu  crédito debe estar desembolsado.',
    },
  },
  {
    src: wideRange,
    label: 'Amplia oferta de vehículos para todos.',
    textClassName: 'text-white',
    modal: {
      title: 'Amplia oferta',
      description:
        'En nuestro inventario de vehículos vas a encontrar variedad de gamas (alta, media y baja).',
    },
  },
  {
    src: upToDateDocuments,
    label: 'Todos nuestros Carfiaos cuentan con documentos y trámites al día',
    textClassName: 'text-primary',
    modal: {
      title: 'Documentos al día',
      description: '',
    },
  },
  {
    src: supportAndAdvice,
    label:
      'Cuenta con el respaldo y la asesoría de nuestra Compañía en tu experiencia de compra y financiación.',
    textClassName: 'text-white',
    modal: {
      title: 'Respaldo y asesoria',
      description:
        'Nuestro equipo Comercial te acompañará y brindará asesoría especializada para que escojas el Carfiao que se ajuste a tu necesidad.',
    },
  },
  {
    src: insurance,
    label: 'Recuerda que nuestros vehículos cuentan con la revisión y respaldo de Bonaparte',
    textClassName: 'text-primary',
    modal: {
      title: 'Respaldo Bonaparte',
      description: '',
    },
  },
]

export const Benefit = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<{
    title: string
    description: string
  } | null>(null)

  const handleCloseModal = () => setSelectedBenefit(null)

  return (
    <Wrapper>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          1200: {
            spaceBetween: 30,
            slidesPerView: 3,
          },
          800: {
            spaceBetween: 30,
            slidesPerView: 2,
          },
          300: {
            spaceBetween: 30,
            slidesPerView: 1,
          },
        }}
      >
        {benefitsItems.map(({ label, src, textClassName, modal }) => (
          <SwiperSlide key={label}>
            <div className='my-10'>
              <div
                className='bg-white rounded-3xl overflow-hidden max-w-md aspect-video mx-auto'
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundPosition: 'contain',
                  backgroundPositionX: 'center',
                  backgroundPositionY: 'top',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className='p-5 h-full flex flex-col justify-between'>
                  <div className='flex justify-end'>
                    <button
                      onClick={() => setSelectedBenefit(modal)}
                      className='bg-white p-1 shadow-md rounded-full'
                    >
                      <BsQuestionLg className='text-primary text-xs' />
                    </button>
                  </div>
                  <div className={`text-center text-lg font-bold ${textClassName}`}>
                    <p>{label}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedBenefit !== null && (
        <Modal show onClose={handleCloseModal}>
          <ModalHeader title={selectedBenefit.title} onClose={handleCloseModal}></ModalHeader>
          <ModalBody>
            <p>{selectedBenefit.description}</p>
          </ModalBody>
        </Modal>
      )}
    </Wrapper>
  )
}
