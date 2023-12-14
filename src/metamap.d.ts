import * as React from 'react'

interface MultiButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  clientId: string
  flowId: string
  color?: string
  metadata?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mati-button': React.DetailedHTMLProps<MultiButtonProps, HTMLButtonElement>
    }
  }
}
