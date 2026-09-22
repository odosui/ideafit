import * as React from 'react'
import { Board } from '../types'
import BoardSectionContent from './sections/BoardSectionContent'
import { currentBoardSection } from './sections/currentBoardSection'

interface Props {
  board: Board
}

const BoardDashboard: React.FC<Props> = ({ board }) => (
  <BoardSectionContent board={board} section={currentBoardSection()} />
)

export default BoardDashboard
