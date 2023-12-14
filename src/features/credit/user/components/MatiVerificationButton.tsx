import React, { MouseEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { ButtonProps } from '@/components/ui/Button/types'
import { MATI_CLIENT_ID, MATI_FLOW_ID } from '@/config'

export type MatiVerificationButtonProps = ButtonProps & {
  onLoad?: (e: CustomEvent<HTMLButtonElement>) => void
  onFinish?: (e: CustomEvent<HTMLButtonElement>) => void
  onExit?: (e: CustomEvent<HTMLButtonElement>) => void
  metadata?: { [x: string]: string }
}

export const MatiVerificationButton = React.memo(
  ({
    onLoad,
    onExit,
    onFinish,
    metadata,
    disabled,
    onClick,
    ...props
  }: MatiVerificationButtonProps) => {
    const matiRef = useRef<HTMLButtonElement>(null)
    const [isStarting, setIsStarting] = useState(false)

    const handleLoad = (e: CustomEvent<HTMLButtonElement>) => {
      setIsStarting(false)
      onLoad && onLoad(e)
    }
    const handleFinish = (e: CustomEvent<HTMLButtonElement>) => {
      onFinish && onFinish(e)
    }
    const handleExit = (e: CustomEvent<HTMLButtonElement>) => {
      onExit && onExit(e)
    }

    const handleStart = (e: MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e)

      if (!matiRef.current) return
      setIsStarting(true)
      matiRef.current.click()
    }

    const handleFaceID = (eventFromParams: any) => {
      const event: CustomEvent<HTMLButtonElement> =
        eventFromParams as CustomEvent<HTMLButtonElement>

      switch (event.type) {
        case 'mati:loaded':
          return handleLoad(event)
        case 'mati:userFinishedSdk':
          return handleFinish(event)
        case 'mati:exitedSdk':
          return handleExit(event)
      }
    }

    useEffect(() => {
      const currentRef = matiRef.current

      if (currentRef) {
        currentRef.addEventListener('mati:loaded', handleFaceID)
        currentRef.addEventListener('mati:userFinishedSdk', handleFaceID)
        currentRef.addEventListener('mati:exitedSdk', handleFaceID)
      }

      return () => {
        if (currentRef) {
          currentRef.removeEventListener('mati:loaded', handleFaceID)
          currentRef.removeEventListener('mati:userFinishedSdk', handleFaceID)
          currentRef.removeEventListener('mati:exitedSdk', handleFaceID)
        }
      }
    }, [handleFaceID])

    return (
      <>
        <div className='pt-4'>
          <Button
            {...props}
            isLoading={isStarting}
            disabled={isStarting || disabled}
            onClick={handleStart}
          >
            Continuar
          </Button>
        </div>

        <div className='hidden'>
          <mati-button
            ref={matiRef}
            clientId={MATI_CLIENT_ID}
            flowId={MATI_FLOW_ID}
            metadata={JSON.stringify(metadata)}
          />
        </div>
      </>
    )
  }
)

MatiVerificationButton.displayName = 'MatiVerificationButton'
