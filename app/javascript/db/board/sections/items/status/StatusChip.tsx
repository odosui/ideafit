import * as React from 'react'
import { ItemStatus, toneOf } from '../../../../../shared/items/itemStatus'
import { labelOfStatus } from '../options/itemStatuses'

const StatusChip: React.FC<{ status: ItemStatus }> = ({ status }) => (
  <span className={`chip chip--${toneOf(status)}`}>{labelOfStatus(status)}</span>
)

export default StatusChip
