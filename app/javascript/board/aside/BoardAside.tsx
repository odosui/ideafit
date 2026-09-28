import * as React from 'react'
import EmailUpdatesSwitch from '../emailConsent/EmailUpdatesSwitch'
import { BoardView } from '../routing/boardView'
import BoardIntro from './BoardIntro'
import BoardNav from './nav/BoardNav'

interface Props {
  view: BoardView
  onViewChange: (view: BoardView) => void
}

const BoardAside: React.FC<Props> = ({ view, onViewChange }) => (
  <aside className="board-aside">
    <BoardIntro />
    <BoardNav view={view} onChange={onViewChange} />
    <EmailUpdatesSwitch />
  </aside>
)

export default BoardAside
