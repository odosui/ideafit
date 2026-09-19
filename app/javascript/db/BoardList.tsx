import * as React from 'react'
import BoardCard from './BoardCard'
import NewBoardToggle from './NewBoardToggle'
import { Board } from './types'

interface Props {
  boards: Board[]
  onCreated: (board: Board) => void
}

const BoardList: React.FC<Props> = ({ boards, onCreated }) => (
  <>
    <NewBoardToggle onCreated={onCreated} />
    <ul className="db-board-list">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </ul>
  </>
)

export default BoardList
