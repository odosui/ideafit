import * as React from 'react'
import Chip from '../../../../../shared/Chip'
import { ItemStatus, toneOf } from '../../../../../shared/items/itemStatus'
import { BoardItem } from '../../../../types'
import KanbanCard from '../card/KanbanCard'
import { useDropZone } from '../drag/useDropZone'

interface Props {
  pid: string
  status: { value: ItemStatus; label: string }
  items: BoardItem[]
  onMove: (id: number, status: ItemStatus) => void
}

const KanbanColumn: React.FC<Props> = ({ pid, status, items, onMove }) => {
  const { over, handlers } = useDropZone((id) => onMove(id, status.value))

  return (
    <section
      className={`kanban-column${over ? ' kanban-column--over' : ''}`}
      aria-label={status.label}
      {...handlers}
    >
      <header className="kanban-column__header">
        <Chip tone={toneOf(status.value)} dot>
          {status.label}
        </Chip>
        <span className="kanban-column__count">{items.length}</span>
      </header>
      <div className="kanban-column__cards">
        {items.map((item) => (
          <KanbanCard
            key={item.id}
            pid={pid}
            item={item}
            onMove={(target) => onMove(item.id, target)}
          />
        ))}
      </div>
    </section>
  )
}

export default KanbanColumn
