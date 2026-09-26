import * as React from 'react'
import BoardSettingsPage from '../../settings/BoardSettingsPage'
import { Board } from '../../types'
import AnalyticsPage from './analytics/AnalyticsPage'
import { BoardSection } from './boardSections'
import ComingSoon from './ComingSoon'
import ItemsPage from './items/ItemsPage'
import KanbanPage from './kanban/KanbanPage'
import ParticipantsPage from './participants/ParticipantsPage'
import SharePage from './share/SharePage'

interface Props {
  board: Board
  section: BoardSection
}

const BoardSectionContent: React.FC<Props> = ({ board, section }) => {
  if (section.key === 'share') return <SharePage board={board} />
  if (section.key === 'items') return <ItemsPage board={board} />
  if (section.key === 'settings') return <BoardSettingsPage board={board} />
  if (section.key === 'kanban') return <KanbanPage board={board} />
  if (section.key === 'participants') return <ParticipantsPage board={board} />
  if (section.key === 'analytics') return <AnalyticsPage board={board} />
  return <ComingSoon section={section} />
}

export default BoardSectionContent
