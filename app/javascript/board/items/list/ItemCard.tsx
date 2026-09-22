import * as React from 'react'
import { Item } from '../../types'
import Voter from '../voting/Voter'
import DeleteItemButton from './DeleteItemButton'
import StatusBadge from './StatusBadge'

interface Props {
  item: Item
  deleteConfirmation: string
  onVote: (item: Item) => void
  onDelete: (item: Item) => void
}

const ItemCard: React.FC<Props> = ({
  item,
  deleteConfirmation,
  onVote,
  onDelete,
}) => (
  <>
    <div className="item__body">
      <h3 className="item__title">{item.title}</h3>
      <p className="item__text">{item.text}</p>
      <div className="item__footer">
        <div>
          <StatusBadge status={item.status} />
        </div>
        <div>
          {item.can_edit && (
            <DeleteItemButton
              confirmation={deleteConfirmation}
              onDelete={() => onDelete(item)}
            />
          )}
        </div>
      </div>
    </div>
    <Voter voted={item.voted} count={item.votes} onClick={() => onVote(item)} />
  </>
)

export default ItemCard
