import { useEffect, useState } from 'react'
import {
  getContractTypes,
  getDepartments,
  getMunicipalitiesByDepartmentId,
  getOccupations,
  getProfessions,
} from '@credit/user/api/creditSelects'

import { Option } from '@/components/Form'
import { DefaultValuesForm } from '@/types'
import { mapSelectToOption } from '@/utils/maps'

import { FinancialAndLaborInfoValues } from './types'

export type UseFinancialAndLaborInfoForm = {
  defaultValues?: Pick<DefaultValuesForm<FinancialAndLaborInfoValues>, 'departmentId'>
}

export const useFinancialAndLaborInfoForm = ({
  defaultValues,
}: UseFinancialAndLaborInfoForm = {}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [professions, setProfessions] = useState<Option[]>([])
  const [occupations, setOccupations] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [municipalities, setMunicipalities] = useState<Option[]>([])
  const [contractTypes, setContractTypes] = useState<Option[]>([])

  const getSelectsValues = async () => {
    try {
      const [professionsRes, occupationsRes, departmentsRes, contractTypesRes] = await Promise.all([
        getProfessions(),
        getOccupations(),
        getDepartments(),
        getContractTypes(),
      ])

      setProfessions(mapSelectToOption(professionsRes.data))
      setOccupations(mapSelectToOption(occupationsRes.data))
      setDepartments(mapSelectToOption(departmentsRes.data))
      setContractTypes(mapSelectToOption(contractTypesRes.data))

      if (defaultValues?.departmentId) {
        const { data } = await getMunicipalitiesByDepartmentId(defaultValues.departmentId)
        setMunicipalities(mapSelectToOption(data))
      }

      setIsLoading(false)
    } catch (error) {}
  }

  const onChangeDepartment = (val: string) => {
    if (val) {
      getMunicipalitiesByDepartmentId(val).then(({ data }) => {
        setMunicipalities(mapSelectToOption(data))
      })
    } else {
      setMunicipalities([])
    }
  }

  useEffect(() => {
    getSelectsValues()
  }, [])

  return {
    isLoading,
    professions,
    occupations,
    departments,
    municipalities,
    contractTypes,
    onChangeDepartment,
  }
}
