import * as React from 'react'
import { BoardItem } from '../../../../../types'
import StatusSelect from '../../status/StatusSelect'
import BackToItems from './BackToItems'
import ItemMeta from './ItemMeta'

interface Props {
  pid: string
  item: BoardItem
  onChanged: (item: BoardItem) => void
}

const ItemHeader: React.FC<Props> = ({ pid, item, onChanged }) => (
  <header className="item-header">
    <BackToItems pid={pid} />
    <div className="item-header__row">
      <h1 className="item-header__title">{item.title}</h1>
      <StatusSelect item={item} onChanged={onChanged} />
    </div>
    <ItemMeta item={item} />
  </header>
)

export default ItemHeader
