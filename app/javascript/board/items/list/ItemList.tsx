import * as React from 'react'
import Spinner from '../../../shared/Spinner'
import { Item } from '../../types'
import AnimatedItems from './AnimatedItems'

interface Props {
  items: Item[] | null
  itemsKey?: string
  loading: boolean
  deleteConfirmation: string
  onVote: (item: Item) => void
  onFollow: (item: Item) => void
  onEdit: (item: Item, title: string, text: string) => Promise<void>
  onDelete: (item: Item) => void
}

// Keyed by the list shown, so a new tab or filter mounts without animation
const ItemList: React.FC<Props> = ({
  items,
  itemsKey,
  loading,
  ...cardProps
}) => (
  <div className={loading ? 'item-list item-list--loading' : 'item-list'}>
    {items === null ? (
      <div className="board-loading">
        <Spinner />
      </div>
    ) : (
      <AnimatedItems key={itemsKey} items={items} {...cardProps} />
    )}
  </div>
)

export default ItemList
