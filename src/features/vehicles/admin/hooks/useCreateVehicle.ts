import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { getVehiclesByFilters } from '../../common/api/getVehicles'
import { createVehicle, CreateVehicleDTO } from '../api/createVehicle'
import { CreateFormValues, schema } from '../components/CreateVehicle'

import { useVehicleSelects } from './useVehicleSelects'

export interface UseCreateVehicleProps {
  onSuccess: (id: string) => void
}

export const useCreateVehicle = ({ onSuccess }: UseCreateVehicleProps) => {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isCreated, setIsCreated] = useState(false)

  const fieldSelects = useVehicleSelects()

  const form = useForm<CreateFormValues>({
    mode: 'all',
    resolver: schema && zodResolver(schema),
  })

  const checkLicencePlate = async (licencePlate: string) => {
    try {
      const { data } = await getVehiclesByFilters({ licencePlate })
      return data.count > 0
    } catch (error) {}
  }

  const validateUniqueLicencePlate = async (licencePlate: string) => {
    const exists = await checkLicencePlate(licencePlate)
    if (exists) {
      form.setError('licencePlate', {
        type: 'custom',
        message: 'Ya existe un vehículo con esta placa',
      })
    }
  }

  const handleSubmit = async (values: CreateFormValues) => {
    const existsVehicle = await checkLicencePlate(values.licencePlate)
    if (existsVehicle) {
      form.setError(
        'licencePlate',
        {
          type: 'custom',
          message: 'Ya existe un vehículo con esta placa',
        },
        { shouldFocus: true }
      )
      return
    }

    const data: CreateVehicleDTO = {
      ...values,
      urlQR: 'QR',
      lineId: values.lineId!,
      dateEntry: new Date().toJSON(),
      brand: fieldSelects.brands.find((b) => String(b.value) === values.brandId)!.label as string,
      class: fieldSelects.classes.find((c) => String(c.value) === values.classId)!.label as string,
      line: fieldSelects.lines.find((l) => String(l.value) === String(values.lineId))!
        .label as string,
      model: fieldSelects.models.find((m) => String(m.value) === values.modelId)!.label as string,
    }

    setIsSubmiting(true)
    try {
      const res = await createVehicle(data)

      if (res.status === 200) {
        setIsCreated(true)
        return onSuccess(res.data)
      }

      if (res.status === 401) {
        return toast.error('No tienes permisos para realizar esta acción')
      }

      throw new Error(res.statusText)
    } catch (error) {
      toast.error('Error creando el vehiculo')
    } finally {
      setIsSubmiting(false)
    }
  }

  useEffect(() => {
    if (!fieldSelects.selectedClassId) {
      form.setValue('classId', '')
    }
  }, [fieldSelects.selectedClassId])

  useEffect(() => {
    if (!fieldSelects.selectedLineId) {
      form.setValue('lineId', null)
    }
  }, [fieldSelects.selectedLineId])

  useEffect(() => {
    if (!fieldSelects.selectedModelId) {
      form.setValue('modelId', '')
    }
  }, [fieldSelects.selectedModelId])

  useEffect(() => {
    if (!fieldSelects.selectedDepartmentId) {
      form.setValue('cityCode', '')
    }
  }, [fieldSelects.selectedDepartmentId])

  return {
    form,
    fieldSelects,
    isSubmiting,
    isCreated,
    handleSubmit,
    validateUniqueLicencePlate,
  }
}
