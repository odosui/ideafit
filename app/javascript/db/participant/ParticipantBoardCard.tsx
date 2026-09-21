import * as React from 'react'
import { Board } from '../types'

interface Props {
  board: Board
}

const ParticipantBoardCard: React.FC<Props> = ({ board }) => (
  <li className="db-board-card">
    <a className="db-board-card__link" href={`/b/${board.pid}`}>
      <span className="db-board-card__name">{board.name}</span>
      <span className="db-board-card__meta">
        {board.items_count} {board.items_count === 1 ? 'item' : 'items'}
      </span>
    </a>
  </li>
)

export default ParticipantBoardCard
