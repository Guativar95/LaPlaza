import { RefAttributes } from 'react'
import { LinkProps, NavLink } from 'react-router-dom'

export interface NavItemProps extends LinkProps, RefAttributes<HTMLAnchorElement> {}

export const ItemNav = ({ children, className, ...props }: NavItemProps) => {
  return (
    <NavLink
      end
      {...props}
      className={`block py-2 px-2 hover:bg-gray-100 rounded-md font-bold ${className}`}
    >
      {children}
    </NavLink>
  )
}
