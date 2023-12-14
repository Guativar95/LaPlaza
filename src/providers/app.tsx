import { ReactNode, Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Spinner } from '@/components/ui/Spinner'
import { AuthProvider } from '@/lib/auth'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center w-screen h-screen'>
          <Spinner />
        </div>
      }
    >
      <HelmetProvider>
        <ToastContainer />
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </Suspense>
  )
}
