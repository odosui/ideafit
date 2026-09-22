import * as React from 'react'
import { Board } from '../../../types'
import ItemsResult from './list/ItemsResult'
import { DEFAULT_ITEM_QUERY, ItemQuery } from './query/itemQuery'
import { useBoardItems } from './query/useBoardItems'
import ItemsToolbar from './toolbar/ItemsToolbar'

interface Props {
  board: Board
}

const ItemsPage: React.FC<Props> = ({ board }) => {
  const [query, setQuery] = React.useState(DEFAULT_ITEM_QUERY)
  const { items, replaceItem } = useBoardItems(board.pid, query)

  const changeQuery = (changes: Partial<ItemQuery>) =>
    setQuery((prev) => ({ ...prev, ...changes }))

  return (
    <section className="items-page">
      <ItemsToolbar query={query} onChange={changeQuery} />
      <ItemsResult pid={board.pid} items={items} onChanged={replaceItem} />
    </section>
  )
}

export default ItemsPage
