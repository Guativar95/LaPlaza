import { useState } from 'react'
import { BiQrScan } from 'react-icons/bi'
import { QRCodeCanvas } from 'qrcode.react'

import { InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { ButtonProps } from '@/components/ui/Button/types'
import { Modal, ModalHeader } from '@/components/ui/Modal'

export type QRButtonProps = ButtonProps & {
  value: string
  name: string
}

export const QRButton = ({ value, name, ...props }: QRButtonProps) => {
  const [showQR, setShowQR] = useState(false)
  const [sizeQR, setSizeQR] = useState(450)

  const downloadQRAsImage = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement
    if (!canvas) return

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `${name}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <>
      <Button
        variant='text'
        className='px-2.5 py-2.5 text-2xl'
        {...props}
        aria-label='Ver QR'
        title='Ver QR'
        onClick={() => setShowQR(!showQR)}
      >
        <BiQrScan />
      </Button>

      {showQR && (
        <Modal show={showQR}>
          <ModalHeader onClose={() => setShowQR(false)} />
          <div className='flex flex-col gap-5 sm:flex-row print:hidden'>
            <QRCodeCanvas value={value} size={200} />
            <div>
              <InputField
                type='number'
                label='Tamaño (px)'
                value={sizeQR}
                onChange={(e) => setSizeQR(parseInt(e.target.value))}
                className='mb-2'
              />
              <Button className='w-full' onClick={() => downloadQRAsImage()}>
                Descargar PNG
              </Button>
              <Button className='w-full mt-1' onClick={() => window.print()}>
                Descargar PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {showQR && (
        <div className='hidden print:block'>
          <div className='fixed inset-36 z-50 w-full h-full bg-white justify-center items-center'>
            <QRCodeCanvas id='qr-code' value={value} size={sizeQR} />
          </div>
        </div>
      )}
    </>
  )
}
