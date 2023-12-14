import { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { SimpleGuarantor } from '@credit/common'
import { CreditLayout } from '@credit/common/components/CreditLayout'

import { Link } from '@/components/ui/Link'
import { Spinner } from '@/components/ui/Spinner'

import { getGuarantorsByApplicationId } from '../api/getGuarantors'
import { RegisterGuarantorsForm } from '../components/RegisterGuarantorsForm'
import { useApplicationContext } from '../store/ApplicationContext'

export const RegisterGuarantorsPage = () => {
  const navigate = useNavigate()
  const { application } = useApplicationContext()
  const [registerCount, setRegisterCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [guarantors, setGuarantors] = useState<SimpleGuarantor[] | undefined[]>([
    undefined,
    undefined,
  ])

  const onRegisterAnyone = () => {
    setRegisterCount(registerCount + 1)
  }

  const loadGuarantors = async () => {
    try {
      const { data } = await getGuarantorsByApplicationId(application.id)
      setGuarantors((g) => g.map((_, i) => data[i]))
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGuarantors()
  }, [])

  return (
    <CreditLayout title='Agregar avalistas'>
      {registerCount > 0 ? (
        <Link to='/inicio' className='inline-block my-5 '>
          Ir al inicio
        </Link>
      ) : (
        <button
          color='light'
          className='my-5 flex items-center gap-1 text-primary py-2 hover:opacity-80'
          onClick={() => navigate(-1)}
          disabled={registerCount > 0}
        >
          <BsChevronLeft className='inline' />
          Volver
        </button>
      )}

      {isLoading && (
        <div className='flex justify-center gap-2'>
          <Spinner />
          <p>Cargando información de avalistas</p>
        </div>
      )}

      {!isLoading && (
        <div className='flex flex-col gap-5'>
          {guarantors.map((defaultValues, i) => (
            <RegisterGuarantorsForm
              key={i}
              onRegisterAnyone={onRegisterAnyone}
              defaultValues={defaultValues}
              readonly={Boolean(defaultValues)}
            />
          ))}
        </div>
      )}
    </CreditLayout>
  )
}
