import { Option } from '@/components/Form'

export const emptySelect: Option = { value: '', label: '--Seleccione--' }
export const feesOptions: Option[] = [...new Array(6)].map((_, i) => {
  const fee = (i + 1) * 12
  return { label: fee, value: fee }
})
export const feeInitialOptions: Option[] = [...new Array(6)].map((option, i) => {
  return { label: (i + 2) * 5, value: (i + 2) * 5 }
})
