import * as React from 'react'
import { BoardItem } from '../../../../../types'
import ItemDetails from '../details/ItemDetails'
import StatusHistory from '../history/StatusHistory'
import { ItemTabKey } from './itemTabs'

interface Props {
  item: BoardItem
  tab: ItemTabKey
}

const ItemTabContent: React.FC<Props> = ({ item, tab }) => {
  if (tab === 'history') return <StatusHistory item={item} />
  return <ItemDetails item={item} />
}

export default ItemTabContent
