import React, { useRef, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth'

export const SessionNav = React.memo(() => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const timeOutId = useRef<ReturnType<typeof setTimeout>>()
  const [isOpen, setIsOpen] = useState(false)

  const onClickHandler = () => {
    setIsOpen(!isOpen)
  }
  const onBlurHandler = () => {
    timeOutId.current = setTimeout(() => {
      setIsOpen(false)
    })
  }
  const onFocusHandler = () => {
    clearTimeout(timeOutId.current)
  }

  return user ? (
    <div className='relative' onBlur={onBlurHandler} onFocus={onFocusHandler}>
      <button
        className={`w-full flex items-center justify-between gap-1 py-2 px-2 rounded-md md:gap-0`}
        onClick={onClickHandler}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        <div className='relative rounded-full text-primary border border-tertiary p-2'>
          <div className='hidden md:block absolute w-1.5 h-1.5 bg-tertiary rounded-full -left-1 top-[40%]' />
          <div className='hidden md:block absolute w-1.5 h-1.5 bg-tertiary rounded-full -right-1 top-[40%]' />
          <FaUserAlt className='text-xl md:text-2xl' />
        </div>
        <div className='relative flex items-center justify-between gap-1 w-full md:-left-1.5 md:border md:border-l-0 md:rounded-tr-md md:rounded-br-md md:border-primary md:pl-3.5 md:pr-2'>
          <span className='font-itc-avant-garde-gothic-demi font-semibold text-primary'>
            Mi Cuenta
          </span>
          <FiChevronDown
            className={`transition-transform text-primary ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:absolute md:bg-white md:min-w-[12rem] md:w-auto md:shadow md:rounded-md md:z-10 md:right-0`}
      >
        <ul className='py-1 pl-1 md:px-0'>
          <button
            onClick={() => {
              logout()
              navigate('/vehiculos')
            }}
            className='w-full block py-2 px-2 hover:bg-gray-100 rounded-md'
          >
            Cerrar sesión
          </button>
        </ul>
      </div>
    </div>
  ) : null
})

SessionNav.displayName = 'SessionNav'
