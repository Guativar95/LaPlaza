import React, { ReactNode } from 'react'

import { Head } from '@/components/Head'
import { Card } from '@/components/ui/Card'
import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'

import circleWithLinePatterns from '../assets/circle-with-line-pattern.svg'
import curve from '../assets/curve.svg'

export type CreditLayoutProps = {
  title: string
  children: ReactNode
}

export const CreditLayout: React.FC<CreditLayoutProps> = ({ title, children }) => {
  return (
    <div className={`min-h-screen`}>
      <Header />
      <Head title={title} />
      <div className='relative max-w-screen-lg mx-auto'>
        <img
          aria-hidden='true'
          src={circleWithLinePatterns}
          alt='circulo con patron de lineas'
          className='hidden xl:block absolute -left-[calc(8rem)] top-0 max-h-[16rem] object-cover'
        />

        <img
          aria-hidden='true'
          src={curve}
          alt='curva'
          className='hidden xl:block absolute max-w-xs -right-[calc(10%)] -bottom-[2.5rem] max-h-[16rem] object-cover'
        />

        <Card className='relative my-10 shadow-lg border border-gray-100'>
          <h1 className='text-4xl font-harabara-mais-demo text-secondary text-center mb-5'>
            {title}
          </h1>
          {children}
        </Card>
      </div>
      <Footer />
    </div>
  )
}
