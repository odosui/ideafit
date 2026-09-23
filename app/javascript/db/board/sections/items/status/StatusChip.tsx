import * as React from 'react'
import Chip from '../../../../../shared/Chip'
import { ItemStatus, toneOf } from '../../../../../shared/items/itemStatus'
import { labelOfStatus } from '../options/itemStatuses'

const StatusChip: React.FC<{ status: ItemStatus }> = ({ status }) => (
  <Chip tone={toneOf(status)} dot>
    {labelOfStatus(status)}
  </Chip>
)

export default StatusChip
