import { FC } from 'react'

export interface ImagesGalleryProps {
  images: { src: string; alt?: string }[]
}

export const ImagesGallery: FC<ImagesGalleryProps> = ({ images }) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
      {images.map(({ src, alt }) => (
        <div key={src} className='relative group'>
          <figure className='rounded-lg overflow-hidden w-full h-full aspect-square bg-gray-100'>
            <img src={src} alt={alt} className='w-full h-full object-cover' />
          </figure>
        </div>
      ))}
    </div>
  )
}
