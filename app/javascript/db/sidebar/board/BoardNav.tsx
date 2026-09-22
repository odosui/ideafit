import * as React from 'react'
import { BOARD_SECTIONS } from '../../board/sections/boardSections'
import { boardSectionPath } from '../../board/sections/boardSectionPath'
import { currentBoardSection } from '../../board/sections/currentBoardSection'
import { Board } from '../../types'
import ExternalSidebarLink from '../ExternalSidebarLink'
import SidebarLink from '../SidebarLink'
import BoardSwitcher from './BoardSwitcher'

interface Props {
  board: Board
}

const BoardNav: React.FC<Props> = ({ board }) => {
  const active = currentBoardSection()

  return (
    <div className="db-sidebar__board">
      <BoardSwitcher current={board} />
      <nav className="db-sidebar__nav" aria-label="Board sections">
        {BOARD_SECTIONS.map((section) => (
          <SidebarLink
            key={section.key}
            href={boardSectionPath(board.pid, section.key)}
            icon={section.icon}
            label={section.label}
            active={section.key === active.key}
          />
        ))}
        <ExternalSidebarLink
          href={`/b/${board.pid}`}
          icon="fas fa-globe"
          label="Public board"
        />
      </nav>
    </div>
  )
}

export default BoardNav
