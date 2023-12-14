import { useState } from 'react'
import { toast } from 'react-toastify'
import { CreditLayout } from '@credit/common'

import { Button } from '@/components/ui/Button'

import { callScoreWithGuarantors } from '../api/callScoreWithGuarantors'
import { useApplicationContext } from '../store/ApplicationContext'

export const ContinueCreditPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { application, handleApplicationResponse } = useApplicationContext()

  const handleContinue = async () => {
    setIsSubmitting(true)

    try {
      const { data } = await callScoreWithGuarantors({ requestCode: application.id })
      handleApplicationResponse(data)
    } catch (error) {
      toast.error('Hemos tenido problemas procesando tu solicitud')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CreditLayout title=''>
      <div className='max-w-lg mx-auto flex flex-col gap-3'>
        <h1 className='text-4xl text-primary font-bold'>Termina tu proceso</h1>
        <p className='text-xl'>
          Tu(s) avalista(s) completaron el proceso satisfactoriamente, por favor da clic en el botón
          para continuar
        </p>
        <div className='flex justify-center my-2'>
          <Button variant='gradient' onClick={() => handleContinue()} isLoading={isSubmitting}>
            Continuar
          </Button>
        </div>
      </div>
    </CreditLayout>
  )
}
