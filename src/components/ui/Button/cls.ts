import { Sizes, VariantColors } from './types'

export const common =
  'inline-flex justify-center items-center rounded-lg border disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none hover:opacity-80 focus:shadow-none focus:opacity-[0.85] active:shadow-none active:opacity-[0.85] disabled:shadow-none transition-opacity'

export const colors: VariantColors = {
  primary: {
    filled: 'bg-primary text-white',
    outlined: 'border-primary text-primary',
    text: 'border-none text-primary hover:bg-primary/10 focus:bg-primary/10',
    link: 'border-none bg-transparent px-0 py-0 text-primary',
    gradient: 'bg-primary text-white bg-gradient-to-r from-tertiary to-primary',
  },
  secondary: {
    filled: 'bg-secondary text-white',
    outlined: 'border-secondary text-secondary',
    text: 'border-none text-secondary hover:bg-secondary/10 focus:bg-secondary/10',
    link: 'border-none bg-transparent px-0 py-0 text-secondary',
  },
  tertiary: {
    filled: 'bg-tertiary text-white',
    outlined: 'border-tertiary text-tertiary',
    text: 'border-none text-tertiary hover:bg-tertiary/10 focus:bg-tertiary/10',
    link: 'border-none bg-transparent px-0 py-0 text-tertiary',
  },
  danger: {
    filled: 'bg-red-500 text-white',
    outlined: 'border-red-500 text-red-500',
    text: 'border-none text-red-500 hover:bg-red-500/10 focus:bg-red-500/10',
    link: 'border-none bg-transparent px-0 py-0 text-red-500',
  },
  success: {
    filled: 'bg-green-500 text-white',
    outlined: 'border-green-500 text-green-500',
    text: 'border-none text-green-500 hover:bg-green-500/10 focus:bg-green-500/10',
    link: 'border-none bg-transparent px-0 py-0 text-green-500',
  },
  info: {
    filled: 'bg-blue-500 text-white',
    outlined: 'border-blue-500 text-blue-500',
    text: 'border-none text-blue-500 hover:bg-blue-500/10 focus:bg-blue-500/10',
    link: 'border-none bg-transparent px-0 py-0 text-blue-500',
  },
  warning: {
    filled: 'bg-amber-500 text-white',
    outlined: 'border-amber-500 text-amber-500',
    text: 'border-none text-amber-500 hover:bg-amber-500/10 focus:bg-amber-500/10',
    link: 'border-none bg-transparent px-0 py-0 text-amber-500',
  },
  light: {
    filled:
      'bg-white text-gray-900 border-none shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-gray-800',
    outlined: 'bg-white text-gray-900 border-gray-100 hover:shadow',
    text: 'bg-white text-gray-900 border-none hover:bg-gray-100',
    link: 'border-none bg-transparent px-0 py-0',
  },
  dark: {
    filled: 'bg-gray-900 text-white',
    outlined: 'bg-white text-gray-900 hover:bg-gray-500/10 focus:bg-gray-500/10',
    text: 'bg-white text-gray-900 border-none hover:bg-gray-100',
    link: 'border-none bg-transparent px-0 py-0',
  },
}

export const sizes: Sizes = {
  sm: 'py-2 px-2 text-sm',
  md: 'py-2 px-3 text-md',
  lg: 'py-3 px-4 text-lg',
  none: '',
}
