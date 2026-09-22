import * as React from 'react'
import { BoardItem } from '../../../../types'
import { labelOfKind } from '../options/itemKinds'
import { formatDate } from './formatDate'
import StatusSelect from './StatusSelect'

interface Props {
  item: BoardItem
  onChanged: (item: BoardItem) => void
}

const ItemRow: React.FC<Props> = ({ item, onChanged }) => (
  <tr className="items-table__row">
    <td className="items-table__main">
      <span className="items-table__title">{item.title}</span>
      {item.text && <span className="items-table__text">{item.text}</span>}
    </td>
    <td>
      <span className="chip">{labelOfKind(item.kind)}</span>
    </td>
    <td className="items-table__votes">{item.votes}</td>
    <td className="items-table__muted">{item.author}</td>
    <td className="items-table__muted">{formatDate(item.created_at)}</td>
    <td>
      <StatusSelect item={item} onChanged={onChanged} />
    </td>
  </tr>
)

export default ItemRow
