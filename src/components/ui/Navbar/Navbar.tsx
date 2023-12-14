import { useState } from 'react'
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/logo.png'
import { useAuth } from '@/lib/auth'

import { ContactButton } from '../Contact'

import { ItemNav } from './ItemNav'
import { NavNotification } from './NavNotification'
import { SessionNav } from './SessionNav'

export const Navbar = () => {
  const { isAuthenticated } = useAuth()
  const [navbar, setNavbar] = useState(false)

  return (
    <nav className='w-full'>
      <div className='justify-between md:items-center md:flex'>
        <div>
          <div className='flex items-center justify-between py-4 md:block'>
            <Link to='/'>
              <picture>
                <img src={logo} alt='Logo Carfiao' className='max-w-[10rem]' />
              </picture>
            </Link>
            <div className='md:hidden'>
              <button
                className='p-2 text-gray-700 rounded-md outline-none text-2xl focus:border-gray-400 focus:border'
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <IoMdClose /> : <IoMdMenu />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}
          >
            <ul className='items-center justify-center md:flex md:space-x-4 md:space-y-0 text-gray-900'>
              <li>
                <ItemNav to='/inicio'>Inicio</ItemNav>
              </li>
              {!isAuthenticated && (
                <li>
                  <ItemNav to='/vehiculos'>Tu Carfiao</ItemNav>
                </li>
              )}
              <li>
                <ItemNav to='/ayuda'>Ayuda</ItemNav>
              </li>
              <li>
                <ContactButton
                  className='block text-left w-full py-2 px-2 hover:bg-gray-100 rounded-md font-bold'
                  text='Contacto'
                />
              </li>
              {isAuthenticated && (
                <li>
                  <ItemNav to={'/vehiculos/admin'}>Panel</ItemNav>
                </li>
              )}
            </ul>
            <div className='md:hidden mt-3 space-y-2'>
              <SessionNav />
            </div>
          </div>
        </div>
        <div className='hidden space-x-2 md:flex md:items-center'>
          <NavNotification />
          <SessionNav />
        </div>
      </div>
    </nav>
  )
}
