export interface Taxes {
  id: number
  name: string
  defaultValue?: number
  minValue: number // default => 1
  maxValue: number // default => 100
  active: boolean
  addByDefault: boolean
}
