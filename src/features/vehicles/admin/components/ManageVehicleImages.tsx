import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getImageByName } from '@vehicles/common/api/getImage'
import { getImagesByVehicleId } from '@vehicles/common/api/getImages'

import { LinkButton } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'

import { uploadVehicleImages } from '../api/uploadImages'

import { ImagesForm } from './ImagesForm'

export type ManageVehicleImagesProps = {
  vehicleId: string
}

const MIN_WIDTH = 500
const MIN_HEIGHT = 300
const MAX_SIZE_IN_MB = 2

export const ManageVehicleImages: React.FC<ManageVehicleImagesProps> = ({ vehicleId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [initialImages, setInitialImages] = useState<File[]>([])

  const createFileFromURL = async (imageName: string) => {
    try {
      const res = await getImageByName(imageName)
      const imageBlob = res.data

      const metadata = {
        type: imageBlob.type,
        size: imageBlob.size,
      }

      return new File([imageBlob], imageName, metadata)
    } catch (error) {
      console.error(error)
    }
  }

  const loadImages = async () => {
    try {
      const res = await getImagesByVehicleId(vehicleId)

      if (res.data.length > 0) {
        const promises: Promise<File | undefined>[] = []
        res.data.forEach((image) => promises.push(createFileFromURL(image.name)))

        const images = await Promise.allSettled(promises)
        const fulfilledImages = images.reduce((acc, cur) => {
          if (cur.status === 'fulfilled' && cur.value) {
            return [...acc, cur.value]
          }

          return acc
        }, [] as File[])

        if (images.length !== fulfilledImages.length) {
          toast.error('Hemos tenido problemas cargando las imagenes del vehículo')
        }
        setInitialImages(fulfilledImages)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const saveImages = useCallback(async (vehicleId: string, images: File[]) => {
    setIsSubmitted(false)
    const form = new FormData()

    form.append('VehicleId', vehicleId)
    images.forEach((image) => {
      form.append('Files', image)
    })

    try {
      await uploadVehicleImages(form)
      setIsSubmitted(true)
      toast.success('Imagenes cargadas exitosamente')
    } catch (error) {
      toast.error('Error cargando las imagenes')
    }
  }, [])

  useEffect(() => {
    loadImages()
  }, [])

  const onSaveChanges = (images: File[]) => saveImages(vehicleId, images)

  return (
    <>
      <p className='text-gray-600'>
        Las imagenes deben ser de una resolución mayor a
        <span className='font-semibold'>
          {' '}
          {MIN_WIDTH}x{MIN_HEIGHT}px
        </span>{' '}
        para una buena calidad y el peso límite por imagen es{' '}
        <span className='font-semibold'>{MAX_SIZE_IN_MB}MB.</span>
      </p>
      {isLoading ? (
        <Spinner className='mx-auto my-3' />
      ) : (
        <ImagesForm
          initialImages={initialImages}
          minResolution={{ width: MIN_WIDTH, height: MIN_HEIGHT }}
          maxSizeInMB={MAX_SIZE_IN_MB}
          onSaveChanges={onSaveChanges}
          renderActions={
            isSubmitted ? (
              <LinkButton to='/vehiculos/admin' variant='text'>
                Volver al panel
              </LinkButton>
            ) : undefined
          }
        />
      )}
    </>
  )
}
