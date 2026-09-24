import * as React from 'react'
import EditItemButton from '../edit/EditItemButton'
import { Item } from '../../types'
import FollowButton from '../following/FollowButton'
import DeleteItemButton from './DeleteItemButton'

interface Props {
  item: Item
  deleteConfirmation: string
  onFollow: () => void
  onEditStart: () => void
  onDelete: () => void
}

const ItemActions: React.FC<Props> = ({
  item,
  deleteConfirmation,
  onFollow,
  onEditStart,
  onDelete,
}) => (
  <div className="item__actions">
    <FollowButton following={item.subscribed} onClick={onFollow} />
    {item.can_edit && <EditItemButton onClick={onEditStart} />}
    {item.can_delete && (
      <DeleteItemButton confirmation={deleteConfirmation} onDelete={onDelete} />
    )}
  </div>
)

export default ItemActions
