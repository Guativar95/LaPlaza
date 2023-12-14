import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { Vehicle } from '@vehicles/common/types'

import { Role } from '@/features/auth'
import { useAuth } from '@/lib/auth'
import { formatCurrency } from '@/utils/format'

import { updateVehicle } from '../api/updateVehicle'
import { EditVehicleValues, schema } from '../components/EditVehicle'

import { useVehicleSelects } from './useVehicleSelects'

export interface UseEditVehicleProps {
  initialValues: Vehicle
}

export const useEditVehicle = ({ initialValues }: UseEditVehicleProps) => {
  const { user } = useAuth()
  const refinedSchema = schema.refine(
    ({ grossValue }) => {
      return grossValue >= initialValues.grossValueInitial
    },
    {
      path: ['grossValue'],
      message: `El valor del vehículo debe ser mayor a ${formatCurrency(
        initialValues.grossValueInitial
      )}`,
    }
  )
  const form = useForm<EditVehicleValues>({ resolver: zodResolver(refinedSchema), mode: 'all' })
  const fieldSelects = useVehicleSelects({
    defaultSelects: {
      brandId: initialValues.brandId,
      classId: initialValues.classId,
      lineId: initialValues.lineId.toString(),
      modelId: initialValues.modelId,
    },
  })

  const [isDisabledEditableFields, setIsDisabledEditableFields] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isDisabledGrossValue = isDisabledEditableFields || user?.roleName !== Role.Administrator

  const toggleEditableFields = (val?: boolean) =>
    setIsDisabledEditableFields(val ?? !isDisabledEditableFields)

  const getInitialValuesMapped = (): Omit<EditVehicleValues, 'brandId' | 'classId' | 'lineId'> => {
    const { dateEntry, vinNumber, ...restInitialValues } = initialValues

    return {
      dateEntry: dateEntry.split('T')[0],
      vin: vinNumber,
      ...restInitialValues,
    }
  }

  const setInitialValues = () => {
    const values = getInitialValuesMapped()
    for (const key in values) {
      const value = (values as any)[key]
      form.setValue(key as keyof EditVehicleValues, value, { shouldValidate: true })
    }
  }

  const handleSubmit = async (values: EditVehicleValues) => {
    setIsSubmitting(true)
    const {
      modelId,
      serviceId,
      chassisNumber,
      engine,
      mainColor,
      secondaryColor,
      serie,
      vin,
      grossValue,
    } = values
    const model = fieldSelects.models.find((e) => String(e.value) === modelId)?.label

    try {
      const { status, statusText } = await updateVehicle({
        ...initialValues,
        mileage: String(initialValues.mileage),
        modelId,
        model: String(model),
        serviceId,
        chassisNumber,
        engine,
        mainColor,
        secondaryColor,
        serie,
        vinNumber: vin,
        grossValue,
      })

      if (status === 200) {
        toast.success('Vehículo actualizado')
      } else {
        throw new Error(statusText)
      }
    } catch (error) {
      toast.error('Hemos tenido problemas actualizando el vehículo')
    } finally {
      setIsSubmitting(false)
      setIsDisabledEditableFields(true)
    }
  }

  useEffect(() => {
    if (!fieldSelects.isLoading) {
      setInitialValues()
    }
  }, [fieldSelects.isLoading])

  return {
    isSubmitting,
    form,
    fieldSelects,
    isDisabledEditableFields,
    isDisabledGrossValue,
    toggleEditableFields,
    setInitialValues,
    handleSubmit,
  }
}
