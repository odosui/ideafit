import * as React from 'react'
import Button from '../../shared/Button'
import readServerData from '../../shared/server'
import { ItemFilter } from '../items/query/itemFilter'
import FilterTabs from './FilterTabs'

const { isOwner } = readServerData()

interface Props {
  filter: ItemFilter
  onFilterChange: (filter: ItemFilter) => void
  addLabel: string
  addHidden: boolean
  onAdd: () => void
}

const BoardToolbar: React.FC<Props> = ({
  filter,
  onFilterChange,
  addLabel,
  addHidden,
  onAdd,
}) => (
  <div className="board-toolbar">
    <FilterTabs filter={filter} isOwner={isOwner} onChange={onFilterChange} />
    <Button
      className={`btn--primary${addHidden ? ' board-toolbar__add--hidden' : ''}`}
      onClick={onAdd}
    >
      <i className="ti-plus" />
      {addLabel}
    </Button>
  </div>
)

export default BoardToolbar
