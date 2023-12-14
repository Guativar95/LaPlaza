import { ReactNode } from 'react'

import logo from '@/assets/images/logo.png'
import { Head } from '@/components/Head'

type LayoutProps = {
  children: ReactNode
  title: string
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className='bg-gray-100'>
      <Head title={title} />
      <div className='container mx-auto'>
        <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
          <div className='w-full p-6 m-auto bg-white max-w-2xl sm:rounded-3xl sm:border sm:border-gray-100 sm:shadow-lg'>
            <div className='my-5'>
              <figure className='flex justify-center'>
                <img src={logo} alt='Logo' className='w-40' />
              </figure>
              <h1 className='text-center text-4xl text-secondary font-harabara-mais-demo mt-5'>
                {title}
              </h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
