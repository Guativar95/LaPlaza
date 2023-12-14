import React, { ReactNode, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

export interface DropdownItemProps {
  icon?: boolean
  text?: string
  content?: ReactNode
  items: { key: string; element: ReactNode }[]
  classNameButton?: string
  classNameItems?: string
  classNameIcon?: string
}

export const DropdownNav = React.memo(
  ({
    icon = true,
    text,
    content,
    items,
    classNameButton,
    classNameIcon,
    classNameItems,
  }: DropdownItemProps) => {
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

    return (
      <div className='relative' onBlur={onBlurHandler} onFocus={onFocusHandler}>
        <button
          className={`w-full flex items-center justify-between gap-1 cursor-default py-2 px-2 font-bold hover:bg-gray-100 rounded-md ${classNameButton}`}
          onClick={onClickHandler}
          aria-haspopup='true'
          aria-expanded={isOpen}
        >
          {content || text}
          {icon && (
            <FiChevronDown
              className={`transition-transform ${isOpen ? 'rotate-180' : ''} ${classNameIcon}`}
            />
          )}
        </button>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:absolute md:bg-white md:min-w-[12rem] md:w-auto md:shadow md:rounded-md md:z-20 ${classNameItems}`}
        >
          <ul className='py-1 pl-1 md:px-0'>
            {items.map(({ element, key }) => (
              <li key={key}>{element}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
)

DropdownNav.displayName = 'DropdownNav'
