import { CreditLayout } from '@credit/common'

import { LinkButton } from '@/components/ui/Button'

export const RejectedCreditPage = () => {
  return (
    <CreditLayout title='Crédito rechazado'>
      <p className='text-center text-lg'>
        Tu solicitud no fue aprobada, por favor comunícate con un asesor
      </p>
      <div className='flex justify-center my-5'>
        <LinkButton to='/inicio' replace variant='gradient'>
          Ir al inicio
        </LinkButton>
      </div>
    </CreditLayout>
  )
}
