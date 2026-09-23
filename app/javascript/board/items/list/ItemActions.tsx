import * as React from 'react'
import EditItemButton from '../edit/EditItemButton'
import { Item } from '../../types'
import DeleteItemButton from './DeleteItemButton'

interface Props {
  item: Item
  deleteConfirmation: string
  onEditStart: () => void
  onDelete: () => void
}

const ItemActions: React.FC<Props> = ({
  item,
  deleteConfirmation,
  onEditStart,
  onDelete,
}) => (
  <div className="item__actions">
    {item.can_edit && <EditItemButton onClick={onEditStart} />}
    {item.can_delete && (
      <DeleteItemButton confirmation={deleteConfirmation} onDelete={onDelete} />
    )}
  </div>
)

export default ItemActions
