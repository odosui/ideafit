import * as React from 'react'
import CopyLinkButton from './links/CopyLinkButton'
import { publicBoardUrl } from './links/publicBoardUrl'
import { Board } from './types'

interface Props {
  board: Board
}

const BoardCard: React.FC<Props> = ({ board }) => (
  <li className="db-board-card">
    <a className="db-board-card__link" href={`/db/boards/${board.pid}`}>
      <span className="db-board-card__pid">{board.name}</span>
      <span className="db-board-card__meta">
        {board.items_count} {board.items_count === 1 ? 'item' : 'items'}
      </span>
    </a>
    <CopyLinkButton
      url={publicBoardUrl(board.pid)}
      className="db-board-card__action"
    />
    <a
      className="db-board-card__action"
      href={`/b/${board.pid}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Open public board in new tab"
      aria-label="Open public board in new tab"
    >
      <i className="fas fa-external-link-alt" />
    </a>
  </li>
)

export default BoardCard
