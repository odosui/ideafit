import * as React from 'react'
import BoardSettingsPage from '../../settings/BoardSettingsPage'
import { Board } from '../../types'
import { BoardSection } from './boardSections'
import ComingSoon from './ComingSoon'
import ItemsPage from './items/ItemsPage'
import SharePage from './share/SharePage'

interface Props {
  board: Board
  section: BoardSection
}

const BoardSectionContent: React.FC<Props> = ({ board, section }) => {
  if (section.key === 'share') return <SharePage board={board} />
  if (section.key === 'items') return <ItemsPage board={board} />
  if (section.key === 'settings') return <BoardSettingsPage board={board} />
  return <ComingSoon section={section} />
}

export default BoardSectionContent
