import * as React from 'react'
import { BoardItem } from '../../../../../types'

const ItemDetails: React.FC<{ item: BoardItem }> = ({ item }) =>
  item.text ? (
    <p className="item-details">{item.text}</p>
  ) : (
    <p className="item-details item-details--empty">No description.</p>
  )

export default ItemDetails
