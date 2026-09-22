import * as React from 'react'
import { BoardItem } from '../../../../types'
import ItemRow from './ItemRow'

interface Props {
  pid: string
  items: BoardItem[]
  onChanged: (item: BoardItem) => void
}

const ItemsTable: React.FC<Props> = ({ pid, items, onChanged }) => (
  <table className="items-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Kind</th>
        <th className="items-table__votes">Votes</th>
        <th>Author</th>
        <th>Created</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <ItemRow key={item.id} pid={pid} item={item} onChanged={onChanged} />
      ))}
    </tbody>
  </table>
)

export default ItemsTable
