import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { colors, common, sizes } from './cls'
import { LinkButtonProps } from './types'

export const LinkButton = ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
  className = '',
  ...props
}: LinkButtonProps) => {
  return (
    <Link className={clsx(common, colors[color][variant], sizes[size], className)} {...props}>
      {startIcon}
      <span className='mx-2'>{children}</span>
      {endIcon}
    </Link>
  )
}
