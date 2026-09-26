import * as React from 'react'
import Chip from '../../../shared/Chip'
import { ItemStatus, toneOf } from '../../../shared/items/itemStatus'

const PUBLIC_LABELS: Partial<Record<ItemStatus, string>> = {
  planned: 'Planned',
  in_progress: 'Work in progress',
  ready: 'Ready to ship',
  done: 'Done',
  rejected: 'Rejected',
}

const StatusBadge: React.FC<{ status: ItemStatus }> = ({ status }) => {
  const label = PUBLIC_LABELS[status]
  if (!label) return null

  return (
    <Chip tone={toneOf(status)} dot>
      {label}
    </Chip>
  )
}

export default StatusBadge
