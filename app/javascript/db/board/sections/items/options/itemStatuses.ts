import { ItemStatus } from '../../../../types'

export type StatusTone = 'neutral' | 'accent' | 'warning' | 'success' | 'danger'

interface StatusOption {
  value: ItemStatus
  label: string
  tone: StatusTone
}

export const ITEM_STATUSES: StatusOption[] = [
  { value: 'fresh', label: 'New', tone: 'neutral' },
  { value: 'planned', label: 'Planned', tone: 'accent' },
  { value: 'in_progress', label: 'In progress', tone: 'warning' },
  { value: 'done', label: 'Shipped', tone: 'success' },
  { value: 'rejected', label: 'Declined', tone: 'danger' },
]

const optionOf = (status: ItemStatus) =>
  ITEM_STATUSES.find((option) => option.value === status)

export const labelOfStatus = (status: ItemStatus) => optionOf(status)?.label ?? status

export const toneOf = (status: ItemStatus) =>
  optionOf(status)?.tone ?? 'neutral'
