import * as React from 'react'
import Chip from '../../../../../../shared/Chip'
import { BoardItem } from '../../../../../types'
import { formatDate } from '../../dates/formatDate'
import { labelOfKind } from '../../options/itemKinds'

const ItemMeta: React.FC<{ item: BoardItem }> = ({ item }) => (
  <div className="item-header__meta">
    <Chip>{labelOfKind(item.kind)}</Chip>
    <span>{item.votes} votes</span>
    <span>by {item.author}</span>
    <span>{formatDate(item.created_at)}</span>
  </div>
)

export default ItemMeta
