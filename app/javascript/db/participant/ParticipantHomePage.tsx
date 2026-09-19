import * as React from 'react'
import { Board } from '../types'
import NoBoardsYet from './NoBoardsYet'
import ParticipantBoardCard from './ParticipantBoardCard'

interface Props {
  boards: Board[]
}

const ParticipantHomePage: React.FC<Props> = ({ boards }) => {
  if (boards.length === 0) return <NoBoardsYet />

  return (
    <ul className="db-board-list">
      {boards.map((board) => (
        <ParticipantBoardCard key={board.id} board={board} />
      ))}
    </ul>
  )
}

export default ParticipantHomePage
