import { useEffect, useState } from 'react'

import { Option } from '@/components/Form'

import { getMileageRange, getMonthlyFeeRange } from '../api/getRanges'
import {
  getBodyworkTypes,
  getFuelTypes,
  getInventoryBrands,
  getInventoryClasses,
  getInventoryModels,
  getTractionTypes,
  getTransmissionTypes,
} from '../api/vehicleSelects'
import { SelectInventory, StatusVehicle } from '../types'

export const useFilterVehicles = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [brands, setBrandsFilters] = useState<Option[]>([])
  const [models, setModels] = useState<Option[]>([])
  const [fuelTypes, setFuelTypes] = useState<Option[]>([])
  const [bodyworkTypes, setBodyworkTypes] = useState<Option[]>([])
  const [transmissionTypes, setTransmissionTypes] = useState<Option[]>([])
  const [tractionsTypes, setTractionsTypes] = useState<Option[]>([])
  const [classTypes, setClassTypes] = useState<Option[]>([])
  const [mileage, setMileage] = useState({
    min: 0,
    max: 0,
  })
  const [monthlyFee, setMonthlyFee] = useState({
    min: 0,
    max: 0,
  })

  const initialLoad = async () => {
    const defaultParams = { statusVehicleId: StatusVehicle.inShowcase }

    try {
      const [
        brandsResponse,
        modelsResponse,
        fuelTypesResponse,
        bodyworkTypesResponse,
        transmissionTypesResponse,
        tractionsTypesResponse,
        mileageResponse,
        monthlyFeeResponse,
        classTypesResponse,
      ] = await Promise.all([
        getInventoryBrands(),
        getInventoryModels(),
        getFuelTypes(defaultParams),
        getBodyworkTypes(defaultParams),
        getTransmissionTypes(defaultParams),
        getTractionTypes(defaultParams),
        getMileageRange(),
        getMonthlyFeeRange(),
        getInventoryClasses(),
      ])

      setBrandsFilters(mapInventorySelect(brandsResponse.data))
      setModels(mapInventorySelect(modelsResponse.data))
      setFuelTypes(mapInventorySelect(fuelTypesResponse.data))
      setBodyworkTypes(mapInventorySelect(bodyworkTypesResponse.data))
      setTransmissionTypes(mapInventorySelect(transmissionTypesResponse.data))
      setTractionsTypes(mapInventorySelect(tractionsTypesResponse.data))
      setClassTypes(mapInventorySelect(classTypesResponse.data))
      setMonthlyFee({
        min: Number(monthlyFeeResponse.data.min),
        max: Number(monthlyFeeResponse.data.max),
      })
      setMileage({ min: Number(mileageResponse.data.min), max: Number(mileageResponse.data.max) })

      setIsLoading(false)
    } catch (err) {
      // Notify error loading selects
    }
  }

  useEffect(() => {
    initialLoad()
  }, [])

  return {
    isLoading,
    brands,
    models,
    fuelTypes,
    bodyworkTypes,
    transmissionTypes,
    tractionsTypes,
    mileage,
    monthlyFee,
    classTypes,
  }
}
const mapInventorySelect = (values: SelectInventory[]): Option[] => {
  return values.map(({ id, name }) => ({ value: id, label: name }))
}
