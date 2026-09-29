import * as React from 'react'
import { useBoardCounts } from '../../board/counts/useBoardCounts'
import { BOARD_SECTIONS } from '../../board/sections/boardSections'
import { boardSectionPath } from '../../board/sections/boardSectionPath'
import { currentBoardSection } from '../../board/sections/currentBoardSection'
import { Board } from '../../types'
import SidebarCounter from '../counter/SidebarCounter'
import ExternalSidebarLink from '../ExternalSidebarLink'
import SidebarLink from '../SidebarLink'
import BoardSwitcher from './BoardSwitcher'

interface Props {
  board: Board
}

const BoardNav: React.FC<Props> = ({ board }) => {
  const active = currentBoardSection()
  const counts = useBoardCounts(board.pid)

  return (
    <div className="db-sidebar__board">
      <BoardSwitcher current={board} />
      <nav className="db-sidebar__nav" aria-label="Board sections">
        {BOARD_SECTIONS.map(({ key, icon, label, counter }) => (
          <SidebarLink
            key={key}
            href={boardSectionPath(board.pid, key)}
            icon={icon}
            label={label}
            active={key === active.key}
          >
            {counter && counts && (
              <SidebarCounter
                value={counts[counter.count]}
                tone={counter.tone}
              />
            )}
          </SidebarLink>
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
