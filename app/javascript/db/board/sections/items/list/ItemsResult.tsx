import * as React from 'react'
import { BoardItem } from '../../../../types'
import ItemsTable from './ItemsTable'

interface Props {
  pid: string
  items: BoardItem[] | null
  onChanged: (item: BoardItem) => void
}

const ItemsResult: React.FC<Props> = ({ pid, items, onChanged }) => {
  if (items === null) return <p className="items-page__note">Loading…</p>
  if (items.length === 0) return <p className="items-page__note">No items found.</p>
  return <ItemsTable pid={pid} items={items} onChanged={onChanged} />
}

export default ItemsResult
