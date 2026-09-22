import * as React from 'react'
import { BoardItem } from '../../../../types'
import { itemPath } from '../item/itemPath'
import { labelOfKind } from '../options/itemKinds'
import { formatDate } from '../dates/formatDate'
import StatusSelect from '../status/StatusSelect'

interface Props {
  pid: string
  item: BoardItem
  onChanged: (item: BoardItem) => void
}

const ItemRow: React.FC<Props> = ({ pid, item, onChanged }) => (
  <tr className="items-table__row">
    <td className="items-table__main">
      <a className="items-table__title" href={itemPath(pid, item.id)}>
        {item.title}
      </a>
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
