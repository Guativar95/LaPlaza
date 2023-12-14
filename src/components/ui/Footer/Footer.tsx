import React from 'react'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { MdOutlineLocationOn, MdOutlinePermPhoneMsg } from 'react-icons/md'
import { TbCalendarTime } from 'react-icons/tb'
import clsx from 'clsx'

import logo from '@/assets/images/logo.png'

import { Wrapper } from '../Wrapper'

import bg from './assets/bg.png'

export type FooterProps = {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={clsx('bg-cover bg-bottom', className)}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Wrapper className='py-10'>
        <div>
          <figure>
            <img src={logo} alt='Logo' className='brightness-0 invert max-w-[12rem]' />
          </figure>
        </div>
        <div className='my-8'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16426.74830821961!2d-74.04943680987314!3d4.872475600750616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e40795a716cc28f%3A0xeebcb93dd36894d5!2sLas%20Margaritas!5e0!3m2!1ses!2sco!4v1668529155031!5m2!1ses!2sco'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            className='w-full h-44'
            allowFullScreen
          ></iframe>
        </div>
        <div className='flex flex-col md:flex-row text-white md:justify-between'>
          <div className='flex justify-between gap-5 text-white'>
            <div className='max-w-[10rem]'>
              <MdOutlineLocationOn className='text-3xl mx-auto' />
              <h5 className='text-center font-bold'>Dirección</h5>
              <address className='text-center text-sm mt-2 not-italic'>
                Av. Cajicá - Chía Portal de <br /> las Margaritas <br /> Local No. 2
              </address>
            </div>
            <span className='mt-7'>|</span>
            <div className='max-w-[10rem]'>
              <TbCalendarTime className='text-3xl mx-auto' />
              <h5 className='text-center font-bold'>Horarios</h5>
              <ol className='text-center text-sm mt-2'>
                <li className='mt-2'>
                  Lunes - Viernes <br /> 9:00 a.m a 6:00 p.m
                </li>
                <li className='mt-2'>
                  Sábado 9:00 a.m <br /> a 5:00 p.m
                </li>
                <li className='mt-2'>
                  Domingo 11:00 a.m <br /> a 4:00 p.m{' '}
                </li>
              </ol>
            </div>
            <span className='mt-7'>|</span>
            <div className='max-w-[10rem]'>
              <MdOutlinePermPhoneMsg className='text-3xl mx-auto' />
              <h5 className='text-center font-bold'>Contacto</h5>
              <p className='text-center text-sm mt-2'>
                (601) <br />
                744 0909
              </p>
            </div>
          </div>
          <div>
            <h5 className='font-bold text-lg'>Redes Sociales</h5>
            <ul className='flex gap-3 md:justify-between'>
              <li className='px-5 sm:px-0'>
                <a
                  href='https://www.facebook.com/Carfiao-112755734949112'
                  className=' block bg-white rounded-md p-1  '
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Facebook'
                >
                  <FaFacebookF className='text-secondary' />
                </a>
              </li>
              <li className='px-5 sm:px-0'>
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
              <li className='px-5 sm:px-0'>
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
        </div>
      </Wrapper>
    </footer>
  )
}
