import { ReactNode } from 'react'

import { Head } from '../Head'
import { Header } from '../ui/Header'
import { Spinner } from '../ui/Spinner'
import { Wrapper } from '../ui/Wrapper'

interface MainLayoutProps {
  title: string
  children: ReactNode
  isLoading?: boolean
  notFound?: boolean
  className?: string
  wrapper?: boolean
}

export const MainLayout = ({
  children,
  title,
  isLoading,
  className,
  wrapper = true,
}: MainLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gray-100`}>
      <Head title={title} />
      <Header />
      <div className={`py-4 ${className}`}>
        {isLoading ? (
          <div className='py-5'>
            <Spinner className='mx-auto' />
          </div>
        ) : wrapper ? (
          <Wrapper>{children}</Wrapper>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
