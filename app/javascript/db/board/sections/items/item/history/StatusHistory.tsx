import * as React from 'react'
import { BoardItem } from '../../../../../types'
import HistoryEntry from './HistoryEntry'
import StatusChip from '../../status/StatusChip'
import { useStatusChanges } from './useStatusChanges'

interface Props {
  item: BoardItem
}

const StatusHistory: React.FC<Props> = ({ item }) => {
  const changes = useStatusChanges(item)
  if (changes === null) return <p className="status-history__note">Loading…</p>

  return (
    <ol
      className="status-history"
      aria-label={`Status history of ${item.title}`}
    >
      {changes.map((change) => (
        <HistoryEntry
          key={change.id}
          label={<StatusChip status={change.status} />}
          who={change.changed_by}
          when={change.created_at}
        />
      ))}
      <HistoryEntry label="Created" who={item.author} when={item.created_at} />
    </ol>
  )
}

export default StatusHistory
