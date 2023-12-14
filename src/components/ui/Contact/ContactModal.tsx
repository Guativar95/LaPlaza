import React, { useEffect } from 'react'
import { BiStore } from 'react-icons/bi'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineMessage, MdOutlinePhoneInTalk } from 'react-icons/md'
import { TbBrandWhatsapp } from 'react-icons/tb'

import { AnchorButton } from '../Button'
import { Modal } from '../Modal'
import { ModalBody } from '../Modal/ModalBody'

export type ContactModalProps = {
  show: boolean
  onClose: () => void
}

export const ContactModal: React.FC<ContactModalProps> = ({ show, onClose }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onEsc)

    return () => {
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <Modal show={show} size='lg'>
      <ModalBody>
        <button
          onClick={onClose}
          className='absolute p-1 -top-1 -right-1 text-secondary text-2xl rounded-full focus-visible:outline-none focus-visible:bg-gray-100'
        >
          <IoMdClose />
        </button>
        <div className='text-center'>
          <h2 className='text-primary text-2xl font-bold mb-4'>Contáctanos</h2>
          <p>Comunícate con nosotros a través de cualquiera de los siguientes medios.</p>
        </div>
        <div className='grid grid-cols-2 gap-5 p-2 my-5'>
          <div>
            <MdOutlinePhoneInTalk className='text-5xl text-primary mx-auto' />
            <div className='text-center'>
              <p>
                Llámanos a nuestra <br /> línea de atención <br />{' '}
              </p>
              <a href='tel:6017440909' className='block text-secondary font-bold mt-3'>
                (601) 744 0909
              </a>
            </div>
          </div>
          <div>
            <TbBrandWhatsapp className='text-5xl text-primary mx-auto' />
            <div className='text-center'>
              <p>
                Escríbenos a <br /> nuestro WhatsApp
              </p>
              <AnchorButton
                href='https://whas.me/u2ExR0oaQT'
                rel='noopener noreferrer'
                color='secondary'
                target='_blank'
                className='!rounded-full py-1 px-5 mt-2 !cursor-pointer'
              >
                Escríbenos
              </AnchorButton>
            </div>
          </div>
          <div>
            <MdOutlineMessage className='text-5xl text-primary mx-auto' />
            <p className='text-center'>
              Envíanos un mensaje a <br /> nuestro correo{' '}
              <a
                href='mailto:servicioalcliente@carfiao.com'
                className='text-primary hidden sm:block '
              >
                servicioalcliente@carfiao.com.co
              </a>
              <a href='mailto:servicioalcliente@carfiao.com' className='text-primary  lg:hidden '>
                servicioalcliente <br /> @carfiao.com.co
              </a>
            </p>
          </div>
          <div>
            <BiStore className='text-5xl text-primary mx-auto' />
            <div className='text-center'>
              <p>Visítanos en nuestra tienda física:</p>
              <address className='not-italic'>
                Av. Cajicá - Chía Portal de Las Margaritas Local No. 2
              </address>
            </div>
          </div>
        </div>
        <div className='text-center mt-10'>
          <p className='font-bold'>Encuéntranos en nuestras redes sociales.</p>
          <ul className='flex justify-center gap-3 my-3'>
            <li className=''>
              <a
                href='https://www.facebook.com/Carfiao-112755734949112'
                className='block bg-white rounded-md p-1'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
              >
                <FaFacebookF className='text-secondary' />
              </a>
            </li>
            <li>
              <a
                href='https://www.instagram.com/carfiao.col/'
                className='block bg-white rounded-md p-0.5'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <FaInstagram className='text-secondary text-xl' />
              </a>
            </li>
            <li>
              <a
                href='https://www.tiktok.com/@carfiao.col'
                className='block bg-white rounded-md p-1'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='TikTok'
              >
                <FaTiktok className='text-secondary' />
              </a>
            </li>
          </ul>
        </div>
      </ModalBody>
    </Modal>
  )
}
