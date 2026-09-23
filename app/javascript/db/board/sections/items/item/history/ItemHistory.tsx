import * as React from 'react'
import { BoardItem } from '../../../../../types'
import HistoryEntry from './HistoryEntry'
import HistoryEventLabel from './HistoryEventLabel'
import { useItemHistory } from './useItemHistory'

interface Props {
  item: BoardItem
}

const ItemHistory: React.FC<Props> = ({ item }) => {
  const events = useItemHistory(item)
  if (events === null) return <p className="status-history__note">Loading…</p>

  return (
    <ol className="status-history" aria-label={`History of ${item.title}`}>
      {events.map((event) => (
        <HistoryEntry
          key={`${event.type}-${event.id}`}
          label={<HistoryEventLabel event={event} />}
          who={event.by}
          when={event.created_at}
        />
      ))}
      <HistoryEntry label="Created" who={item.author} when={item.created_at} />
    </ol>
  )
}

export default ItemHistory
