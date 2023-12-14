import React from 'react'
import { LinkProps } from 'react-router-dom'

export type Variants = 'filled' | 'outlined' | 'text' | 'link' | 'gradient'
export type Colors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'
export type SizesValues = 'sm' | 'md' | 'lg' | 'none'

export type VariantColors = {
  [x in Colors]: {
    [key in Variants]?: string
  }
}

export type Sizes = {
  [x in SizesValues]: string
}

export type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type CommonButtonProps = IconProps & {
  color?: Colors
  variant?: Variants
  size?: SizesValues
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonButtonProps & {
    isLoading?: boolean
  }

export type LinkButtonProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement> &
  CommonButtonProps & {}
export type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  CommonButtonProps & {}
