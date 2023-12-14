import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { MainLayout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'

import { ManageVehicleImages } from '../components/ManageVehicleImages'

export const Images = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const fromCreateForm = searchParams.get('created') !== null

  useEffect(() => {
    if (!id) {
      navigate('/404')
      return
    }

    if (fromCreateForm) {
      toast.success('Vehículo creado exitosamente')
    }
  }, [])

  return (
    <MainLayout title='Imagenes vehículo'>
      <Card>
        <h1 className='text-3xl'>Imagenes de vehículo</h1>
        <ManageVehicleImages vehicleId={id!} />
      </Card>
    </MainLayout>
  )
}
