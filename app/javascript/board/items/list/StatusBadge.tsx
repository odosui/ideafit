import * as React from 'react'
import { ItemStatus, toneOf } from '../../../shared/items/itemStatus'

const PUBLIC_LABELS: Partial<Record<ItemStatus, string>> = {
  planned: 'Planned',
  in_progress: 'Work in progress',
  done: 'Done',
  rejected: 'Rejected',
}

const StatusBadge: React.FC<{ status: ItemStatus }> = ({ status }) => {
  const label = PUBLIC_LABELS[status]
  if (!label) return null

  return <span className={`chip chip--${toneOf(status)}`}>{label}</span>
}

export default StatusBadge
