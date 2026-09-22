import * as React from 'react'
import { Board, BoardItem } from '../types'
import ItemPage from './sections/items/item/ItemPage'
import BoardSectionContent from './sections/BoardSectionContent'
import { currentBoardSection } from './sections/currentBoardSection'

interface Props {
  board: Board
  item?: BoardItem
}

const BoardDashboard: React.FC<Props> = ({ board, item }) => {
  if (item) return <ItemPage board={board} item={item} />
  return <BoardSectionContent board={board} section={currentBoardSection()} />
}

export default BoardDashboard
