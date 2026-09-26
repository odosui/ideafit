import * as React from 'react'
import { itemPath } from '../../items/item/itemPath'
import StatusChip from '../../items/status/StatusChip'
import { TopItem } from '../query/boardAnalytics'

interface Props {
  pid: string
  item: TopItem
}

const TopItemRow: React.FC<Props> = ({ pid, item }) => (
  <li className="top-items__row">
    <a className="top-items__title" href={itemPath(pid, item.id)}>
      {item.title}
    </a>
    <StatusChip status={item.status} />
    <span className="top-items__votes">
      {item.votes} {item.votes === 1 ? 'vote' : 'votes'}
    </span>
  </li>
)

export default TopItemRow
