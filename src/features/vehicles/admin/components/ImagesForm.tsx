import React, { ReactNode, useCallback, useRef, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/Button'
import { DropAndSelectFileArea } from '@/components/ui/DropFileArea'
import { ModalConfirm } from '@/components/ui/Modal'

interface ImagesFormProps {
  maxSizeInMB?: number
  minResolution?: { width: number; height: number }
  limitAmount?: number
  initialImages?: File[]
  renderActions?: ReactNode
  onSaveChanges: (files: File[]) => Promise<void>
}

export const ImagesForm = React.memo(
  ({
    maxSizeInMB = 1,
    limitAmount = 10,
    minResolution,
    initialImages = [],
    onSaveChanges,
    renderActions,
  }: ImagesFormProps) => {
    const selectedIndex = useRef<number | null>(null)
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])

    const [images, setImages] = useState<File[]>(initialImages)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showMultipleConfirm, setShowMultipleConfirm] = useState(false)

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
        if (minResolution) {
          if (image.width >= minResolution.width && image.height >= minResolution.height) {
            setImages((i) => [...i, file])
          } else {
            toast.error(`${file.name} es de baja calidad (${image.width}x${image.height}px)`)
          }
        } else {
          setImages((i) => [...i, file])
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

    const handleAddFiles = useCallback(
      (filesUploaded: File[]) => {
        const filesAtTheLimit = getFilesAtTheLimit(filesUploaded)
        const allowedFormats = filesAtTheLimit.filter(filterAllowedFormats)
        const allowedMaxSize = allowedFormats.filter(filterMaxSize)

        if (minResolution) {
          allowedMaxSize.forEach(filterMinSize)
        } else {
          setImages((i) => [...i, ...allowedMaxSize])
        }
      },
      [setImages, getFilesAtTheLimit, filterAllowedFormats, filterMaxSize]
    )

    const handleRemove = (index: number) => {
      selectedIndex.current = index
      setShowConfirm(true)
    }

    const handleMultipleRemove = () => {
      setShowMultipleConfirm(true)
    }

    const handleCheckChange = useCallback(
      (checked: boolean, fileIndex: number) => {
        const i = selectedIndexes.indexOf(fileIndex)

        if (checked) {
          setSelectedIndexes((indexes) => [...indexes, fileIndex])
        } else {
          const selectedIndexesCopy = [...selectedIndexes]
          selectedIndexesCopy.splice(i, 1)
          setSelectedIndexes(selectedIndexesCopy)
        }
      },
      [selectedIndexes, setSelectedIndexes]
    )

    const handleSaveChanges = async () => {
      setIsSubmitting(true)
      await onSaveChanges(images)
      setIsSubmitting(false)
    }

    const removeImage = useCallback(
      (index: number) => {
        handleCheckChange(false, index)

        const imagesCopy = [...images]
        imagesCopy.splice(index, 1)
        setImages(imagesCopy)
      },
      [images, handleCheckChange, setImages]
    )

    const removeMultipleSelection = useCallback(() => {
      setImages(images.filter((_, i) => !selectedIndexes.includes(i)))
      setSelectedIndexes([])
    }, [images, selectedIndexes, setImages, setSelectedIndexes])

    return (
      <div>
        <div className='my-4'>
          <DropAndSelectFileArea
            onAddFiles={handleAddFiles}
            disabled={images.length === limitAmount}
            accept='image/*'
            multiple
          />
        </div>
        <div className='columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 my-5'>
          {images.map((image, i) => (
            <div key={`${i}${image.name}`} className='relative h-min w-full rounded-xl bg-gray-600'>
              <div className='rounded-tr-lg rounded-bl-xl absolute right-0 top-0 flex items-center gap-3 bg-white border border-gray-200  py-2 px-3'>
                <input
                  type='checkbox'
                  className='scale-125 rounded-sm border-gray-300'
                  onChange={(e) => handleCheckChange(e.target.checked, i)}
                />
                <Button
                  color='danger'
                  size='none'
                  className='!rounded-full p-1 border-none'
                  onClick={() => handleRemove(i)}
                >
                  <CgClose size={14} />
                </Button>
              </div>
              <img
                src={URL.createObjectURL(image)}
                alt='image'
                className='object-center object-cover w-full rounded-xl'
              />
            </div>
          ))}
        </div>

        <div className='flex flex-col gap-2 md:flex-row md:justify-end'>
          {renderActions}
          <Button
            color='danger'
            disabled={selectedIndexes.length === 0}
            onClick={handleMultipleRemove}
          >
            Eliminar selección
          </Button>
          <Button
            disabled={images.length === 0 || isSubmitting}
            isLoading={isSubmitting}
            onClick={handleSaveChanges}
          >
            Guardar cambios
          </Button>
        </div>

        {showConfirm && (
          <ModalConfirm
            show={showConfirm}
            title='¿Está seguro de eliminar la imagen?'
            onReject={() => {
              setShowConfirm(false)
              selectedIndex.current = null
            }}
            onAccept={() => {
              if (selectedIndex !== null) {
                removeImage(selectedIndex.current as number)
                setShowConfirm(false)
              }
            }}
          />
        )}

        {showMultipleConfirm && (
          <ModalConfirm
            show={showMultipleConfirm}
            title={`¿Está seguro de eliminar ${selectedIndexes.length} imagen(es)?`}
            onReject={() => {
              setShowMultipleConfirm(false)
            }}
            onAccept={() => {
              setShowMultipleConfirm(false)
              removeMultipleSelection()
            }}
          />
        )}
      </div>
    )
  }
)

ImagesForm.displayName = 'ImagesForm'
