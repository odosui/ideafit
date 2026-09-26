import { ItemStatus } from '../../../../../shared/items/itemStatus'

interface StatusOption {
  value: ItemStatus
  label: string
}

export const ITEM_STATUSES: StatusOption[] = [
  { value: 'fresh', label: 'New' },
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'ready', label: 'Ready to ship' },
  { value: 'done', label: 'Shipped' },
  { value: 'rejected', label: 'Declined' },
]

export const labelOfStatus = (status: ItemStatus) =>
  ITEM_STATUSES.find((option) => option.value === status)?.label ?? status
