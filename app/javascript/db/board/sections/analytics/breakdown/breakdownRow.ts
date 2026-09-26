import { StatusTone } from '../../../../../shared/items/itemStatus'

export interface BreakdownRow {
  key: string
  label: string
  count: number
  tone: StatusTone | 'accent'
}
