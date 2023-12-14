import { SelectMasterService } from '@vehicles/common/types'

import { Option } from '@/components/Form'

export const mapSelectToOption = (list: SelectMasterService[]): Option[] =>
  list.map((el) => ({ label: el.value, value: el.id }))
