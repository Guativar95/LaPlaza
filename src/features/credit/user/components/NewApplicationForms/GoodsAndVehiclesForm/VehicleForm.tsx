import { FC, Ref, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  getClassesByBrandId,
  getLinesByBrandIdAndClassId,
  getModelsByLineId,
} from '@vehicles/common/api/vehicleSelects'

import { NumericField, Option, SelectField } from '@/components/Form'
import { Spinner } from '@/components/ui/Spinner'
import { DefaultValuesForm } from '@/types'
import { emptySelect } from '@/utils/defaults'
import { mapSelectToOption } from '@/utils/maps'

import { vehicleSchema, VehicleValues } from './types'

export type VehicleFormProps = {
  innerRef: Ref<HTMLFormElement>
  onSucces: (values: VehicleValues) => void
  onInvalid: () => void
  brands: Option[]
  defaultValues?: DefaultValuesForm<VehicleValues>
  saveOnChange?: (values: DefaultValuesForm<VehicleValues>) => void
}

export const VehicleForm: FC<VehicleFormProps> = ({
  onSucces,
  onInvalid,
  innerRef,
  brands,
  defaultValues,
  saveOnChange,
}) => {
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<VehicleValues>({
    mode: 'all',
    resolver: zodResolver(vehicleSchema),
    defaultValues,
  })

  const [initialLoading, setInitialLoading] = useState(true)

  const [classes, setClasses] = useState<Option[]>([])
  const [lines, setLines] = useState<Option[]>([])
  const [models, setModels] = useState<Option[]>([])

  const onChangeBrand = (brandId: string) => {
    if (brandId) {
      getClassesByBrandId(brandId).then((res) => {
        setClasses(mapSelectToOption(res.data))
      })
    } else {
      setClasses([])
    }

    setValue('classId', '')
    setValue('lineId', '')
    setValue('modelId', '')
    setLines([])
    setModels([])
  }

  const onChangeClass = (classId: string) => {
    if (classId) {
      getLinesByBrandIdAndClassId(getValues('brandId'), classId).then((res) => {
        setLines(mapSelectToOption(res.data))
      })
    } else {
      setLines([])
    }

    setValue('lineId', '')
    setValue('modelId', '')
    setModels([])
  }

  const onChangeLine = (lineId: string) => {
    if (lineId) {
      getModelsByLineId(lineId).then((res) => {
        setModels(mapSelectToOption(res.data))
      })
    } else {
      setModels([])
    }

    setValue('modelId', '')
  }

  const getDefaultValues = async () => {
    try {
      const [classesRes, linesRes, modelsRes] = await Promise.all([
        getClassesByBrandId(defaultValues?.brandId!),
        getLinesByBrandIdAndClassId(defaultValues?.brandId!, defaultValues?.classId!),
        getModelsByLineId(defaultValues?.lineId!),
      ])

      setClasses(mapSelectToOption(classesRes.data))
      setLines(mapSelectToOption(linesRes.data))
      setModels(mapSelectToOption(modelsRes.data))
    } catch (error) {
      toast.error('Hemos tenido problemas obteniendo los datos del vehículo')
    } finally {
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    if (defaultValues) {
      getDefaultValues()
    } else {
      setInitialLoading(false)
    }
  }, [])

  if (initialLoading) {
    return <Spinner className='mx-auto' />
  }

  return (
    <form
      onSubmit={handleSubmit(onSucces, onInvalid)}
      ref={innerRef}
      className='grid gap-3 md:grid-cols-2'
    >
      <SelectField
        label='Marca'
        options={brands}
        registration={register('brandId', {
          onChange: (e) => onChangeBrand(e.target.value),
          onBlur: () => saveOnChange && saveOnChange(getValues()),
        })}
        error={errors.brandId}
      />
      <SelectField
        label='Clase'
        options={[emptySelect, ...classes]}
        registration={register('classId', {
          onChange: (e) => onChangeClass(e.target.value),
          onBlur: () => saveOnChange && saveOnChange(getValues()),
        })}
        error={errors.classId}
      />
      <SelectField
        label='Línea'
        options={[emptySelect, ...lines]}
        registration={register('lineId', {
          onChange: (e) => onChangeLine(e.target.value),
        })}
        error={errors.lineId}
      />
      <SelectField
        label='Modelos'
        options={[emptySelect, ...models]}
        registration={register('modelId', {
          onBlur: () => saveOnChange && saveOnChange(getValues()),
        })}
        error={errors.modelId}
      />
      <div className='md:col-span-2'>
        <NumericField
          label='Valor'
          control={control}
          name='tradePrice'
          error={errors.tradePrice}
          formatAs='currency'
          onBlur={() => saveOnChange && saveOnChange(getValues())}
        />
      </div>
    </form>
  )
}
