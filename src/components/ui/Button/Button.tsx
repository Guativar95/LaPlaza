import React from 'react'
import clsx from 'clsx'

import { Spinner } from '@/components/ui/Spinner'

import { colors, common, sizes } from './cls'
import { ButtonProps } from './types'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'filled',
      color = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(common, colors[color][variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Spinner size='sm' className='text-inherit mr-1' />}
        {!isLoading && startIcon}
        <span>{props.children}</span> {!isLoading && endIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
