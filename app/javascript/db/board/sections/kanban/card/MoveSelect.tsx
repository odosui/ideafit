import * as React from 'react'
import { ItemStatus } from '../../../../../shared/items/itemStatus'
import { BoardItem } from '../../../../types'
import { ITEM_STATUSES } from '../../items/options/itemStatuses'

interface Props {
  item: BoardItem
  onMove: (status: ItemStatus) => void
}

const MoveSelect: React.FC<Props> = ({ item, onMove }) => (
  <span className="kanban-card__move">
    <i className="fas fa-ellipsis-h" aria-hidden="true" />
    <select
      className="select-overlay"
      aria-label={`Status of ${item.title}`}
      value={item.status}
      onChange={(e) => onMove(e.target.value as ItemStatus)}
    >
      {ITEM_STATUSES.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </span>
)

export default MoveSelect
