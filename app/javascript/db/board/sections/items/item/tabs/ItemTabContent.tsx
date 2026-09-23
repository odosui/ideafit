import * as React from 'react'
import { BoardItem } from '../../../../../types'
import ItemDetails from '../details/ItemDetails'
import ItemHistory from '../history/ItemHistory'
import { ItemTabKey } from './itemTabs'

interface Props {
  item: BoardItem
  tab: ItemTabKey
}

const ItemTabContent: React.FC<Props> = ({ item, tab }) => {
  if (tab === 'history') return <ItemHistory item={item} />
  return <ItemDetails item={item} />
}

export default ItemTabContent
