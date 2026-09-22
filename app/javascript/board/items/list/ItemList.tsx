import { animated, useTransition } from '@react-spring/web'
import * as React from 'react'
import Spinner from '../../../shared/Spinner'
import { Item } from '../../types'
import ItemCard from './ItemCard'

const ITEM_ANIMATIONS = {
  from: { opacity: 0, transform: 'scale(0.5)' },
  enter: { opacity: 1, transform: 'scale(1)' },
  leave: { opacity: 0, transform: 'scale(0.5)' },
  keys: (item: Item) => item.id,
}

interface Props {
  items: Item[] | null
  deleteConfirmation: string
  onVote: (item: Item) => void
  onDelete: (item: Item) => void
}

const ItemList: React.FC<Props> = ({ items, ...cardProps }) => {
  const transitions = useTransition(items ?? [], ITEM_ANIMATIONS)

  return (
    <div className="item-list">
      {items === null && (
        <div className="board-loading">
          <Spinner />
        </div>
      )}

      {transitions((style, item) => (
        <animated.div className="item" style={style} key={item.id}>
          <ItemCard item={item} {...cardProps} />
        </animated.div>
      ))}
    </div>
  )
}

export default ItemList
