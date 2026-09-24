import * as React from 'react'
import { Item } from '../../types'
import ItemActions from '../actions/ItemActions'
import StatusBadge from './StatusBadge'

interface Props {
  item: Item
  deleteConfirmation: string
  onFollow: () => void
  onEditStart: () => void
  onDelete: () => void
}

const ItemContent: React.FC<Props> = ({ item, ...actionProps }) => (
  <>
    <h3 className="item__title">{item.title}</h3>
    <p className="item__text">{item.text}</p>
    <div className="item__footer">
      <div>
        <StatusBadge status={item.status} />
      </div>
      <ItemActions item={item} {...actionProps} />
    </div>
  </>
)

export default ItemContent
