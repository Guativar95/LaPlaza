import { createRef, RefObject, useEffect, useRef, useState } from 'react'
import { DefaultValues } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getGoodTypes } from '@credit/user/api/creditSelects'
import { getBrands } from '@vehicles/common/api/vehicleSelects'

import { Option } from '@/components/Form'
import { DefaultValuesForm } from '@/types'
import { mapSelectToOption } from '@/utils/maps'

import { GoodsAndVehicleValues, GoodValues, VehicleValues } from './types'

type FormItem<T> = {
  id: number
  ref: RefObject<HTMLFormElement>
  defaultValues?: DefaultValuesForm<T>
  values?: T
}

export type UseGoodAndVehicleForm = {
  onSuccess: (values: GoodsAndVehicleValues) => void
  defaultValues?: DefaultValues<GoodsAndVehicleValues>
  saveProgressOnChange?: (values: DefaultValues<GoodsAndVehicleValues>) => void
}

export const useGoodsAndVehicleForm = ({
  onSuccess,
  defaultValues,
  saveProgressOnChange,
}: UseGoodAndVehicleForm) => {
  const mounted = useRef(false)
  const lastIdRef = useRef(1)

  const [initialLoading, setInitialLoading] = useState(true)
  const [submitCount, setSubmitCount] = useState(0)
  const [goodForms, setGoodForms] = useState<FormItem<GoodValues>[]>([])
  const [vehicleForms, setVehicleForms] = useState<FormItem<VehicleValues>[]>([])

  const [brands, setBrands] = useState<Option[]>([])
  const [goodTypes, setGoodTypes] = useState<Option[]>([])

  const getSelectValues = async () => {
    try {
      const [brandsRes, goodTypesRes] = await Promise.all([getBrands(), getGoodTypes()])

      setBrands(mapSelectToOption(brandsRes.data))
      setGoodTypes(mapSelectToOption(goodTypesRes.data))
    } catch (error) {
      toast.error('Hemos tenido problemas obteniendo los datos')
    } finally {
      setInitialLoading(false)
    }
  }

  const appendGoodForm = () => {
    const id = lastIdRef.current + 1
    lastIdRef.current = id

    setGoodForms((i) => [...i, { id, ref: createRef<HTMLFormElement>() }])
  }

  const removeGoodForm = (id: number) => {
    const newGoodRefs = goodForms.filter((i) => i.id !== id)
    setGoodForms(newGoodRefs)
  }

  const setGoodValues = (id: number, values?: GoodValues) => {
    setGoodForms((f) =>
      f.map((item): FormItem<GoodValues> => {
        if (item.id !== id) return item

        return { ...item, values }
      })
    )
  }

  const setDefaultGoodValues = (id: number, values?: DefaultValues<GoodValues>) => {
    setGoodForms((f) =>
      f.map((item): FormItem<GoodValues> => {
        if (item.id !== id) return item

        return { ...item, defaultValues: values }
      })
    )
  }

  const appendVehicleForm = () => {
    const id = lastIdRef.current + 1
    lastIdRef.current = id

    setVehicleForms((i) => [...i, { id, ref: createRef<HTMLFormElement>() }])
  }

  const removeVehicleForm = (id: number) => {
    const newVehicleForm = vehicleForms.filter((i) => i.id !== id)
    setVehicleForms(newVehicleForm)
  }

  const setVehicleValues = (id: number, values?: VehicleValues) => {
    setVehicleForms((f) =>
      f.map((item): FormItem<VehicleValues> => {
        if (item.id !== id) return item

        return { ...item, values }
      })
    )
  }

  const setDefaultVehicleValues = (id: number, values?: DefaultValues<VehicleValues>) => {
    setVehicleForms((f) =>
      f.map((item): FormItem<VehicleValues> => {
        if (item.id !== id) return item

        return { ...item, defaultValues: values }
      })
    )
  }

  const handleSubmit = () => {
    goodForms.forEach((item) => {
      const form = item.ref.current
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    })

    vehicleForms.forEach((item) => {
      const form = item.ref.current
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      }
    })

    setTimeout(() => setSubmitCount(submitCount + 1), 300)
  }

  useEffect(() => {
    if (!mounted.current) return

    const goodsWithValues = goodForms.reduce((acc, curr) => (curr.values ? acc + 1 : acc), 0)
    const vehiclesWithValues = vehicleForms.reduce((acc, curr) => (curr.values ? acc + 1 : acc), 0)

    const areValid =
      goodForms.length === goodsWithValues && vehicleForms.length === vehiclesWithValues

    if (areValid) {
      onSuccess({
        goods: goodForms.map((i) => i.values!),
        vehicles: vehicleForms.map((i) => i.values!),
      })
    }
  }, [submitCount])

  useEffect(() => {
    getSelectValues()

    if (defaultValues?.goods?.length) {
      const defaultGoods = defaultValues.goods.map(
        (defaultValues): FormItem<GoodValues> => ({
          id: ++lastIdRef.current,
          ref: createRef<HTMLFormElement>(),
          defaultValues,
        })
      )

      setGoodForms(defaultGoods)
    }

    if (defaultValues?.vehicles?.length) {
      const defaultVehicles = defaultValues.vehicles.map(
        (defaultValues): FormItem<VehicleValues> => ({
          id: ++lastIdRef.current,
          ref: createRef<HTMLFormElement>(),
          defaultValues,
        })
      )

      setVehicleForms(defaultVehicles)
    }

    mounted.current = true
  }, [])

  useEffect(() => {
    if (saveProgressOnChange) {
      saveProgressOnChange({
        goods: goodForms.map((goodForm) => goodForm.defaultValues).filter((el) => el),
        vehicles: vehicleForms.map((vehicleForm) => vehicleForm.defaultValues).filter((el) => el),
      })
    }
  }, [vehicleForms, goodForms])

  return {
    initialLoading,
    handleSubmit,
    goodForms,
    appendGoodForm,
    removeGoodForm,
    setGoodValues,
    setDefaultGoodValues,
    vehicleForms,
    appendVehicleForm,
    removeVehicleForm,
    setVehicleValues,
    setDefaultVehicleValues,
    selects: {
      brands,
      goodTypes,
    },
  }
}
