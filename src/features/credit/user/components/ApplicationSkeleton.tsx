import { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

export const ApplicationSkeleton = () => {
  const InlineWrapper = ({ children }: { children?: ReactNode }) => {
    return <span className='mr-[4%] last-of-type:mr-0'>{children}</span>
  }

  return (
    <div>
      <div className='my-5 flex flex-col-reverse gap-10 md:flex-row  md:gap-5'>
        <div className='w-full flex flex-col gap-12'>
          <div className='w-4/6'>
            <Skeleton />
          </div>
          <div className='w-3/6 h-5'>
            <Skeleton height='100%' />
          </div>
          <div className='w-4/6'>
            <Skeleton width='100%' />
            <Skeleton width='70%' />
          </div>
          <div className='h-12'>
            <Skeleton count={2} inline width='48%' wrapper={InlineWrapper} height='100%' />
          </div>
        </div>
        <div className='flex justify-center md:justify-end items-center'>
          <div className='w-full h-72 md:w-72'>
            <Skeleton height='100%' borderRadius={50} />
          </div>
        </div>
      </div>
      <div className='my-10 flex justify-center'>
        <div className='w-3/5'>
          <div>
            <Skeleton />
          </div>
          <div className='w-40 h-10 mx-auto mt-5'>
            <Skeleton height='100%' />
          </div>
        </div>
      </div>
    </div>
  )
}
