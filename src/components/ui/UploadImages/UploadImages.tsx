import { FC, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { DropAndSelectFileArea } from '../DropFileArea'

export interface UploadImagesProps {
  onChangeFiles: (files: File[]) => void
  maxSizeInMB?: number
  minResolution?: { width: number; height: number }
  limitAmount?: number
  initialImages?: File[]
}

export const UploadImages: FC<UploadImagesProps> = ({
  onChangeFiles,
  maxSizeInMB = 1,
  limitAmount = 5,
  minResolution = { height: 500, width: 500 },
  initialImages = [],
}) => {
  const [uploadImages, setUploadImages] = useState<File[]>([])
  const [images, setImages] = useState<File[]>(initialImages)

  const filterAllowedFormats = useCallback(
    (file: File): boolean => Boolean(file.type.match(/^image\/.+$/)),
    []
  )

  const filterMaxSize = useCallback(
    (file: File): boolean => {
      const sizeInMB = file.size / (1024 * 1024)
      const isAtTheLimit = sizeInMB <= maxSizeInMB
      if (!isAtTheLimit) toast.error(`${file.name} excede ${maxSizeInMB}MB`)

      return isAtTheLimit
    },
    [maxSizeInMB]
  )

  const filterMinSize = useCallback((file: File) => {
    const image = new Image()

    image.onload = () => {
      if (image.width >= minResolution?.width! && image.height >= minResolution?.height!) {
        setImages((i) => [...i, file])
      } else {
        toast.error(`${file.name} es de baja calidad (${image.width}x${image.height}px)`)
      }
    }

    image.src = URL.createObjectURL(file)
  }, [])

  const getFilesAtTheLimit = useCallback(
    (filesFromParams: File[]) => {
      const len = images.length + filesFromParams.length
      if (len > limitAmount) return filesFromParams.slice(0, limitAmount - images.length)

      return filesFromParams
    },
    [images, limitAmount]
  )

  const handleAddFiles = (uploadFiles: File[]) => {
    const filesAtTheLimit = getFilesAtTheLimit(uploadFiles)
    const allowedFormats = filesAtTheLimit.filter(filterAllowedFormats)
    const allowedMaxSize = allowedFormats.filter(filterMaxSize)

    setUploadImages((images) => [...images, ...allowedMaxSize])
  }

  const handleRemove = (idx: number) => {
    setImages((images) => images.filter((_, i) => i !== idx))
  }

  useEffect(() => {
    if (uploadImages.length === 0) return

    uploadImages.forEach((uploadImage) => {
      filterMinSize(uploadImage)
    })

    setUploadImages([])
  }, [uploadImages])

  useEffect(() => {
    onChangeFiles(images)
  }, [images])

  return (
    <article className='flex flex-col gap-3'>
      <DropAndSelectFileArea onAddFiles={handleAddFiles} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
        {images.map((image, idx) => (
          <div key={`${image.name}-${idx}`} className='relative group'>
            <button
              className='absolute opacity-0 top-1 right-1 px-2 bg-red-500 shadow text-white rounded-full group-hover:opacity-100 focus:opacity-100'
              onClick={() => handleRemove(idx)}
              type='button'
            >
              Remover
            </button>
            <figure className='rounded-lg overflow-hidden w-full h-full aspect-square bg-gray-100'>
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                className='w-full h-full object-cover'
              />
            </figure>
          </div>
        ))}
      </div>
    </article>
  )
}
