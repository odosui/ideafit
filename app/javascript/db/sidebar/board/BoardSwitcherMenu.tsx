import * as React from 'react'
import { boardSectionPath } from '../../board/sections/boardSectionPath'
import { currentBoardSection } from '../../board/sections/currentBoardSection'
import { Board } from '../../types'
import { useBoardList } from './useBoardList'

interface Props {
  current: Board
}

const optionClassName = (isCurrent: boolean) =>
  `board-switcher__option${isCurrent ? ' board-switcher__option--current' : ''}`

const BoardSwitcherMenu: React.FC<Props> = ({ current }) => {
  const boards = useBoardList()
  const section = currentBoardSection()

  return (
    <div className="board-switcher__menu" role="menu">
      {boards === null && <p className="board-switcher__loading">Loading…</p>}
      {boards?.map((board) => {
        const isCurrent = board.pid === current.pid
        return (
          <a
            key={board.pid}
            role="menuitem"
            className={optionClassName(isCurrent)}
            href={boardSectionPath(board.pid, section.key)}
            aria-current={isCurrent ? 'page' : undefined}
          >
            <span>{board.name}</span>
            {isCurrent && <i className="fas fa-check" aria-hidden="true" />}
          </a>
        )
      })}
      <a role="menuitem" className="board-switcher__all" href="/">
        <i className="fas fa-th-large" aria-hidden="true" />
        All boards
      </a>
    </div>
  )
}

export default BoardSwitcherMenu
