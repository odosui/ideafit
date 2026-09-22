import * as React from 'react'
import readServerData from '../../shared/server'
import { DEFAULT_BOARD_DESCRIPTION } from '../../shared/boardDescription'

const { boardId, boardName, boardDescription, isOwner } = readServerData()

const BoardIntro: React.FC = () => (
  <div className="board-intro">
    <div className="board-intro__heading">
      <h1 className="board-intro__title">{boardName}</h1>
      {isOwner && (
        <a
          className="board-intro__settings"
          href={`/db/boards/${boardId}/settings`}
          aria-label="Board settings"
          title="Board settings"
        >
          <i className="ti-pencil" aria-hidden="true" />
        </a>
      )}
    </div>
    <p className="board-intro__description">
      {boardDescription || DEFAULT_BOARD_DESCRIPTION}
    </p>
  </div>
)

export default BoardIntro
