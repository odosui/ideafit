import { animated, useTransition } from '@react-spring/web'
import * as React from 'react'
import { Item } from '../../types'
import ItemCard from './ItemCard'

// `initial: null` skips the enter animation for the items present on mount,
// so only items added or removed later animate
const ITEM_ANIMATIONS = {
  initial: null,
  from: { opacity: 0, transform: 'scale(0.5)' },
  enter: { opacity: 1, transform: 'scale(1)' },
  leave: { opacity: 0, transform: 'scale(0.5)' },
  keys: (item: Item) => item.id,
}

interface Props {
  items: Item[]
  deleteConfirmation: string
  onVote: (item: Item) => void
  onEdit: (item: Item, title: string, text: string) => Promise<void>
  onDelete: (item: Item) => void
}

const AnimatedItems: React.FC<Props> = ({ items, ...cardProps }) => {
  const transitions = useTransition(items, ITEM_ANIMATIONS)

  return transitions((style, item) => (
    <animated.div className="item" style={style} key={item.id}>
      <ItemCard item={item} {...cardProps} />
    </animated.div>
  ))
}

export default AnimatedItems
