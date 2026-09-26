import * as React from 'react'
import { ItemStatus } from '../../../../../shared/items/itemStatus'
import { BoardItem } from '../../../../types'
import { ITEM_STATUSES } from '../../items/options/itemStatuses'
import KanbanColumn from '../column/KanbanColumn'
import { moveItem } from './moveItem'

interface Props {
  pid: string
  items: BoardItem[]
  onChanged: (item: BoardItem) => void
}

const KanbanBoard: React.FC<Props> = ({ pid, items, onChanged }) => {
  const moveTo = (id: number, status: ItemStatus) => {
    const item = items.find((candidate) => candidate.id === id)
    if (item) moveItem(item, status, onChanged)
  }

  return (
    <div className="kanban-board">
      {ITEM_STATUSES.map((status) => (
        <KanbanColumn
          key={status.value}
          pid={pid}
          status={status}
          items={items.filter((item) => item.status === status.value)}
          onMove={moveTo}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
