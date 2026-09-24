import * as React from 'react'
import EditItemForm from '../edit/EditItemForm'
import { Item } from '../../types'
import Voter from '../voting/Voter'
import ItemContent from './ItemContent'

interface Props {
  item: Item
  deleteConfirmation: string
  onVote: (item: Item) => void
  onFollow: (item: Item) => void
  onEdit: (item: Item, title: string, text: string) => Promise<void>
  onDelete: (item: Item) => void
}

const ItemCard: React.FC<Props> = ({
  item,
  deleteConfirmation,
  onVote,
  onFollow,
  onEdit,
  onDelete,
}) => {
  const [editing, setEditing] = React.useState(false)

  const save = async (title: string, text: string) => {
    await onEdit(item, title, text)
    setEditing(false)
  }

  return (
    <>
      <div className="item__body">
        {editing ? (
          <EditItemForm
            item={item}
            onSave={save}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <ItemContent
            item={item}
            deleteConfirmation={deleteConfirmation}
            onFollow={() => onFollow(item)}
            onEditStart={() => setEditing(true)}
            onDelete={() => onDelete(item)}
          />
        )}
      </div>
      <Voter
        voted={item.voted}
        count={item.votes}
        onClick={() => onVote(item)}
      />
    </>
  )
}

export default ItemCard
