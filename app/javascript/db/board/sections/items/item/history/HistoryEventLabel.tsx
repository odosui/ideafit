import * as React from 'react'
import { HistoryEvent } from '../../../../../types'
import StatusChip from '../../status/StatusChip'

const HistoryEventLabel: React.FC<{ event: HistoryEvent }> = ({ event }) =>
  event.type === 'status_change' ? (
    <StatusChip status={event.status} />
  ) : (
    'Edited'
  )

export default HistoryEventLabel
