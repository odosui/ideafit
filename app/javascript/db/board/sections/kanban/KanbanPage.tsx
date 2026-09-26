import * as React from 'react'
import { Board } from '../../../types'
import { DEFAULT_ITEM_QUERY, ItemQuery } from '../items/query/itemQuery'
import { useBoardItems } from '../items/query/useBoardItems'
import KanbanBoard from './board/KanbanBoard'
import KanbanToolbar from './toolbar/KanbanToolbar'

const KANBAN_QUERY: ItemQuery = { ...DEFAULT_ITEM_QUERY, sort: 'most_voted' }

interface Props {
  board: Board
}

const KanbanPage: React.FC<Props> = ({ board }) => {
  const [query, setQuery] = React.useState(KANBAN_QUERY)
  const { items, replaceItem } = useBoardItems(board.pid, query)

  const changeQuery = (changes: Partial<ItemQuery>) =>
    setQuery((prev) => ({ ...prev, ...changes }))

  return (
    <section className="kanban-page">
      <KanbanToolbar query={query} onChange={changeQuery} />
      {items === null ? (
        <p className="items-page__note">Loading…</p>
      ) : (
        <KanbanBoard pid={board.pid} items={items} onChanged={replaceItem} />
      )}
    </section>
  )
}

export default KanbanPage
