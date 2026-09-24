import * as React from 'react'
import { Item } from '../../types'
import FollowToggle from './follow/FollowToggle'
import ItemMenu from './menu/ItemMenu'
import { itemMenuActions } from './menu/itemMenuActions'

interface Props {
  item: Item
  deleteConfirmation: string
  onFollow: () => void
  onEditStart: () => void
  onDelete: () => void
}

const ItemActions: React.FC<Props> = ({ item, onFollow, ...handlers }) => {
  const menuActions = itemMenuActions(item, handlers)

  return (
    <div className="item__actions">
      <FollowToggle following={item.subscribed} onToggle={onFollow} />
      {menuActions.length > 0 && <ItemMenu actions={menuActions} />}
    </div>
  )
}

export default ItemActions
