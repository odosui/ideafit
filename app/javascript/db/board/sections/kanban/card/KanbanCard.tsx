import * as React from 'react'
import KindIcon from '../../../../../shared/items/KindIcon'
import { ItemStatus } from '../../../../../shared/items/itemStatus'
import { BoardItem } from '../../../../types'
import { itemPath } from '../../items/item/itemPath'
import { labelOfKind } from '../../items/options/itemKinds'
import { putCard } from '../drag/cardTransfer'
import MoveSelect from './MoveSelect'

interface Props {
  pid: string
  item: BoardItem
  onMove: (status: ItemStatus) => void
}

const KanbanCard: React.FC<Props> = ({ pid, item, onMove }) => {
  const [dragging, setDragging] = React.useState(false)

  const startDrag = (event: React.DragEvent) => {
    putCard(event.dataTransfer, item.id)
    setDragging(true)
  }

  return (
    <div
      className={`kanban-card${dragging ? ' kanban-card--dragging' : ''}`}
      draggable
      onDragStart={startDrag}
      onDragEnd={() => setDragging(false)}
    >
      <a
        className="kanban-card__title"
        href={itemPath(pid, item.id)}
        draggable={false}
      >
        {item.title}
      </a>
      <div className="kanban-card__meta">
        <span className="kanban-card__kind" title={labelOfKind(item.kind)}>
          <KindIcon kind={item.kind} />
          <span className="kanban-card__kind-label">
            {labelOfKind(item.kind)}
          </span>
        </span>
        <span className="kanban-card__votes" aria-label={`${item.votes} votes`}>
          <i className="fas fa-chevron-up" aria-hidden="true" />
          {item.votes}
        </span>
        <MoveSelect item={item} onMove={onMove} />
      </div>
    </div>
  )
}

export default KanbanCard
