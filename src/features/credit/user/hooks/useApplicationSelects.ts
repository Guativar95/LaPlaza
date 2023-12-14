import { useEffect, useMemo, useState } from 'react'
import { SelectMasterService } from '@vehicles/common/types'

import { Option } from '@/components/Form'

import {
  getDepartments,
  getIdentificationTypes,
  getMunicipalitiesByDepartmentId,
  getOccupations,
} from '../api/creditSelects'

const mapSelectOption = (options: SelectMasterService[]): Option[] =>
  options.map((el) => ({ label: el.value, value: el.id }))

export const useApplicationSelects = () => {
  const emptyOption: Option = useMemo(() => ({ value: '', label: '-- Seleccione --' }), [])
  const [departaments, setDepartaments] = useState<Option[]>([])
  const [municipalities, setMunicipalities] = useState<Option[]>([])
  const [occupations, setOccupations] = useState<Option[]>([])
  const [identificationTypes, setIdentificationTypes] = useState<Option[]>([])

  const [selectedDepartmmetId, setSelectedDepartmmetId] = useState('')
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState('')

  const loadSelects = async () => {
    try {
      const [departmentsResponse, occupationsReponse, identificationTypesResponse] =
        await Promise.all([getDepartments(), getOccupations(), getIdentificationTypes()])

      setDepartaments(mapSelectOption(departmentsResponse.data))
      setOccupations(mapSelectOption(occupationsReponse.data))
      setIdentificationTypes(mapSelectOption(identificationTypesResponse.data))
    } catch (error) {}
  }

  const getMunicipalities = async (departmentId: string) => {
    const res = await getMunicipalitiesByDepartmentId(departmentId)
    setMunicipalities(mapSelectOption(res.data))
  }

  const onDepartmentChange = (id: string) => {
    setSelectedDepartmmetId(id)
  }

  const onMunicipalityChange = (id: string) => {
    setSelectedMunicipalityId(id)
  }

  useEffect(() => {
    loadSelects()
  }, [])

  useEffect(() => {
    if (selectedDepartmmetId) {
      getMunicipalities(selectedDepartmmetId)
    } else {
      setSelectedMunicipalityId('')
      setMunicipalities([])
    }
  }, [selectedDepartmmetId])

  return {
    emptyOption,
    identificationTypes,
    departaments,
    municipalities,
    occupations,
    selectedDepartmmetId,
    selectedMunicipalityId,
    onDepartmentChange,
    onMunicipalityChange,
  }
}
