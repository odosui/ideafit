import * as React from 'react'
import { OutboxChange } from '../query/outbox'
import OutboxChangeCard from './OutboxChangeCard'

interface Props {
  pid: string
  changes: OutboxChange[]
  onDropped: () => void
}

const OutboxChanges: React.FC<Props> = ({ pid, changes, onDropped }) => (
  <ul className="outbox-changes" aria-label="Unsent status changes">
    {changes.map((change) => (
      <OutboxChangeCard
        key={change.item_id}
        pid={pid}
        change={change}
        onDropped={onDropped}
      />
    ))}
  </ul>
)

export default OutboxChanges
