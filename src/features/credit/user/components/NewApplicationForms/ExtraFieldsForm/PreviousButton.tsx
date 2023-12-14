import { FC } from 'react'

import { Button } from '@/components/ui/Button'

export type PreviousButtonProps = {
  onPrevious?: () => void
}

export const PreviousButton: FC<PreviousButtonProps> = ({ onPrevious }) => {
  if (!onPrevious) return null

  return (
    <Button color='secondary' onClick={() => onPrevious()}>
      Anterior
    </Button>
  )
}
