import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { getImagesByVehicleId } from '@vehicles/common/api/getImages'

import notAvaliable from '../assets/images/image-not-avaliable.svg'

interface CarouselItem {
  id: number
  route: string
  name: string
}

interface DetailsGalleryProps {
  vehicleId: string
}

// TODO: Check stating and ending scroll to show and hide buttons
export const DetailsGallery = React.memo(({ vehicleId }: DetailsGalleryProps) => {
  const scrollImagesRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [images, setImages] = useState<CarouselItem[]>([
    {
      id: 1,
      name: 'Imagenes no disponibles',
      route: notAvaliable,
    },
  ])

  const getImages = useCallback(async (id: string) => {
    try {
      const res = await getImagesByVehicleId(id)

      if (res.data.length > 0) setImages(res.data)
    } catch (error: any) {
      if (error.response.status === 404) return
      toast.error('Hemos tenido problemas cargando las imagenes')
    }
  }, [])

  const scrollTo = (to: 'right' | 'left') => {
    const el = scrollImagesRef.current
    if (!el) return

    const scrollWith = {
      left: -el.clientWidth,
      right: el.clientWidth,
    }

    el.scrollTo({ left: el.scrollLeft + scrollWith[to] })
  }

  useEffect(() => {
    getImages(vehicleId)
  }, [vehicleId])

  return (
    <article>
      <div className='relative rounded-xl overflow-hidden mb-3 h-[15rem] sm:h-[22rem] xl:h-[25rem] 2xl:h-[30rem]'>
        <div className='w-full h-full'>
          {images.map(({ route, name, id }, i) => (
            <img
              key={id}
              src={route}
              alt={name}
              className={`rounded-xl w-full h-full bg-gray-200 object-cover object-center ${
                i !== activeIndex && 'hidden'
              }`}
              onError={(e: any) => (e.target.src = notAvaliable)}
            />
          ))}
        </div>
        {activeIndex !== 0 && (
          <div className='absolute h-full top-0 left-0 px-2 flex justify-center items-center'>
            <button
              className='p-3 rounded-full hover:bg-gray-500/50'
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              <FiChevronLeft className='text-white text-5xl' />
            </button>
          </div>
        )}
        {activeIndex !== images.length - 1 && (
          <div className='absolute h-full top-0 right-0 px-2 flex justify-center items-center'>
            <button
              className='p-3 rounded-full hover:bg-gray-500/50'
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              <FiChevronRight className='text-white text-5xl' />
            </button>
          </div>
        )}
      </div>
      <div className='relative rounded-xl overflow-hidden'>
        <div className='absolute h-full top-0 left-0 px-1 md:px-2 flex justify-center items-center z-10 pointer-events-none'>
          <button
            className='p-2 rounded-full hover:bg-gray-500/50 pointer-events-auto'
            onClick={() => scrollTo('left')}
          >
            <FiChevronLeft className='text-white text-3xl' />
          </button>
        </div>
        <div className='absolute h-full top-0 right-0 px-1 md:px-2 flex justify-center items-center z-10 pointer-events-none'>
          <button
            className='p-2 rounded-full hover:bg-gray-500/50 pointer-events-auto'
            onClick={() => scrollTo('right')}
          >
            <FiChevronRight className='text-white text-3xl' />
          </button>
        </div>
        <div
          className='flex gap-3 w-full h-24 md:h-28 lg:h-32 snap-x overflow-x-auto scroll-smooth md:no-scrollbar'
          ref={scrollImagesRef}
        >
          {images.map(({ route, name, id }, i) => (
            <button
              key={id}
              className={`flex-shrink-0 hover:opacity-75`}
              onClick={() => setActiveIndex(i)}
            >
              <img
                src={route}
                alt={name}
                className='rounded-xl h-full bg-gray-200'
                onError={(e: any) => (e.target.src = notAvaliable)}
              />
            </button>
          ))}
        </div>
      </div>
    </article>
  )
})

DetailsGallery.displayName = 'DetailsGallery'
