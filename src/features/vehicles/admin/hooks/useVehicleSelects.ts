import { useEffect, useMemo, useRef, useState } from 'react'
import {
  getBodyworkTypes,
  getBrands,
  getClassesByBrandId,
  getConditions,
  getFuelTypes,
  getLinesByBrandIdAndClassId,
  getModelsByLineId,
  getOffices,
  getOrigins,
  getServices,
  getStatus,
  getTractionTypes,
  getTransmissionTypes,
} from '@vehicles/common/api/vehicleSelects'
import { SelectInventory, SelectMasterService } from '@vehicles/common/types'

import { Option } from '@/components/Form'
import {
  getDepartments,
  getMunicipalities,
  getMunicipalitiesByDepartmentId,
} from '@/features/credit/user/api/creditSelects'

export interface UseVehicleSelectsProps {
  defaultSelects?: {
    brandId: string
    classId: string
    lineId: string
    modelId: string
  }
}

export const useVehicleSelects = ({ defaultSelects }: UseVehicleSelectsProps = {}) => {
  const isMounted = useRef(false)
  const emptyOption: Option = useMemo(() => ({ value: '', label: '-- Seleccione --' }), [])
  const [isLoading, setIsLoading] = useState(true)
  const [brands, setBrands] = useState<Option[]>([])
  const [models, setModels] = useState<Option[]>([])
  const [classes, setClasses] = useState<Option[]>([])
  const [origins, setOrigins] = useState<Option[]>([])
  const [lines, setLines] = useState<Option[]>([])
  const [conditions, setConditions] = useState<Option[]>([])
  const [statusVehicle, setStatusVehicle] = useState<Option[]>([])
  const [fuelTypes, setFuelTypes] = useState<Option[]>([])
  const [offices, setOffices] = useState<Option[]>([])
  const [bodyworkTypes, setBodyworkTypes] = useState<Option[]>([])
  const [transmissionTypes, setTransmissionTypes] = useState<Option[]>([])
  const [tractionTypes, setTractionTypes] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [municipalities, setMunicipalities] = useState<Option[]>([])
  const [services, setServices] = useState<Option[]>([])

  const [selectedBrandId, setSelectedBrandId] = useState<string>(defaultSelects?.brandId || '')
  const [selectedClassId, setSelectedClassId] = useState<string>(defaultSelects?.classId || '')
  const [selectedLineId, setSelectedLineId] = useState<string>(defaultSelects?.lineId || '')
  const [selectedModelId, setSelectedModelId] = useState<string>(defaultSelects?.modelId || '')
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('')

  const initialLoad = async () => {
    try {
      const defaultSelectsGetters = defaultSelects
        ? [
            getClassesByBrandId(defaultSelects.brandId),
            getLinesByBrandIdAndClassId(defaultSelects.brandId, defaultSelects.classId),
            getModelsByLineId(defaultSelects.lineId),
            getMunicipalities(),
          ]
        : []

      const [
        originsResponse,
        conditionsResponse,
        bodyworkTypesResponse,
        statusResponse,
        transmissionTypesResponse,
        fuelTypesResponse,
        tractionTypesResponse,
        officesResponse,
        brandsResponse,
        departmentsResponse,
        servicesResponse,
        ...restResponses
      ] = await Promise.all([
        getOrigins(),
        getConditions(),
        getBodyworkTypes(),
        getStatus(),
        getTransmissionTypes(),
        getFuelTypes(),
        getTractionTypes(),
        getOffices(),
        getBrands(),
        getDepartments(),
        getServices(),
        ...defaultSelectsGetters,
      ])

      setOrigins(mapInventorySelect(originsResponse.data))
      setConditions(mapInventorySelect(conditionsResponse.data))
      setBodyworkTypes(mapInventorySelect(bodyworkTypesResponse.data))
      setStatusVehicle(mapInventorySelect(statusResponse.data))
      setTransmissionTypes(mapInventorySelect(transmissionTypesResponse.data))
      setFuelTypes(mapInventorySelect(fuelTypesResponse.data))
      setTractionTypes(mapInventorySelect(tractionTypesResponse.data))
      setOffices(mapInventorySelect(officesResponse.data))
      setBrands(mapMasterServiceSelect(brandsResponse.data))
      setDepartments(mapMasterServiceSelect(departmentsResponse.data))
      setServices(mapInventorySelect(servicesResponse.data))

      if (defaultSelects) {
        const [classesRes, linesRes, modelsRes, municipalitiesRes] = restResponses

        setClasses(mapMasterServiceSelect(classesRes.data))
        setLines(mapMasterServiceSelect(linesRes.data))
        setModels(mapMasterServiceSelect(modelsRes.data))
        setMunicipalities(mapMasterServiceSelect(municipalitiesRes.data))
      }

      setIsLoading(false)
    } catch (err) {
      // Notify error loading selects
    }
  }

  const getClasses = async (brandId: string) => {
    try {
      const res = await getClassesByBrandId(brandId)
      setClasses(mapMasterServiceSelect(res.data))
    } catch {
      // Show error
    }
  }

  const getLines = async (brandId: string, classId: string) => {
    try {
      const res = await getLinesByBrandIdAndClassId(brandId, classId)
      setLines(mapMasterServiceSelect(res.data))
    } catch (error) {}
  }

  const getModels = async (lineId: string) => {
    try {
      const res = await getModelsByLineId(lineId)
      setModels(mapMasterServiceSelect(res.data))
    } catch (error) {}
  }

  const fetchMunicipalities = async (departmentId: string) => {
    const res = await getMunicipalitiesByDepartmentId(departmentId)
    setMunicipalities(mapMasterServiceSelect(res.data))
  }

  const onBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId)
  }

  const onClassChange = (classId: string) => {
    setSelectedClassId(classId)
  }

  const onLineChange = (lineId: string) => {
    setSelectedLineId(lineId)
  }

  const onModelChange = (modelId: string) => {
    setSelectedModelId(modelId)
  }

  const onDepartmentChange = async (departmentId: string) => {
    setSelectedDepartmentId(departmentId)
  }

  useEffect(() => {
    isMounted.current = true
    initialLoad()
  }, [])

  useEffect(() => {
    if (defaultSelects && isMounted.current) return

    if (selectedBrandId) {
      getClasses(selectedBrandId)
    } else {
      setClasses([])
    }

    setSelectedClassId('')
  }, [selectedBrandId])

  useEffect(() => {
    if (defaultSelects && isMounted.current) return

    if (selectedBrandId && selectedClassId) {
      getLines(selectedBrandId, selectedClassId)
    }

    if (!selectedClassId) {
      setLines([])
    }

    setSelectedLineId('')
  }, [selectedClassId])

  useEffect(() => {
    if (defaultSelects && isMounted.current) return

    if (selectedBrandId && selectedClassId && selectedLineId) {
      getModels(selectedLineId)
    }

    if (!selectedLineId) {
      setModels([])
    }

    setSelectedModelId('')
  }, [selectedLineId])

  useEffect(() => {
    if (defaultSelects && isMounted.current) return

    if (selectedDepartmentId) {
      fetchMunicipalities(selectedDepartmentId)
    } else {
      setMunicipalities([])
    }
  }, [selectedDepartmentId])

  return {
    isLoading,
    emptyOption,
    selectedBrandId,
    selectedClassId,
    selectedLineId,
    selectedModelId,
    selectedDepartmentId,
    brands,
    models,
    classes,
    origins,
    lines,
    conditions,
    statusVehicle,
    fuelTypes,
    offices,
    bodyworkTypes,
    transmissionTypes,
    tractionTypes,
    departments,
    municipalities,
    services,
    onBrandChange,
    onClassChange,
    onLineChange,
    onModelChange,
    onDepartmentChange,
  }
}

const mapMasterServiceSelect = (values: SelectMasterService[]): Option[] => {
  return values.map(({ id, value }) => ({ value: id, label: value }))
}

const mapInventorySelect = (values: SelectInventory[]): Option[] => {
  return values.map(({ id, name }) => ({ value: id, label: name }))
}
