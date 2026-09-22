import * as React from 'react'
import { Board, BoardItem } from '../../../../types'
import ItemHeader from './header/ItemHeader'
import ItemTabContent from './tabs/ItemTabContent'
import ItemTabNav from './tabs/ItemTabNav'
import { currentItemTab } from './tabs/currentItemTab'

interface Props {
  board: Board
  item: BoardItem
}

const ItemPage: React.FC<Props> = ({ board, item: initialItem }) => {
  const [item, setItem] = React.useState(initialItem)
  const tab = currentItemTab()

  return (
    <section className="item-page">
      <ItemHeader pid={board.pid} item={item} onChanged={setItem} />
      <ItemTabNav pid={board.pid} item={item} active={tab} />
      <ItemTabContent item={item} tab={tab} />
    </section>
  )
}

export default ItemPage
