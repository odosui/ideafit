import * as React from 'react'
import KindIcon from '../../../shared/items/KindIcon'
import { BoardView } from '../../routing/boardView'
import BoardNavLink from './BoardNavLink'
import RoadmapIcon from './RoadmapIcon'
import SettingsNavLink from './SettingsNavLink'

const KIND_LINKS = [
  { view: 'idea', label: 'Ideas', icon: <KindIcon kind="idea" /> },
  { view: 'bug', label: 'Bugs', icon: <KindIcon kind="bug" /> },
  { view: 'question', label: 'Questions', icon: <KindIcon kind="question" /> },
] as const

interface Props {
  view: BoardView
  onChange: (view: BoardView) => void
}

const BoardNav: React.FC<Props> = ({ view, onChange }) => (
  <nav className="board-nav" aria-label="Board">
    {KIND_LINKS.map((link) => (
      <BoardNavLink
        key={link.view}
        {...link}
        active={view === link.view}
        onSelect={onChange}
      />
    ))}
    <hr className="board-nav__divider" />
    <BoardNavLink
      view="roadmap"
      label="Roadmap"
      icon={<RoadmapIcon />}
      active={view === 'roadmap'}
      onSelect={onChange}
    />
    <SettingsNavLink view={view} onChange={onChange} />
  </nav>
)

export default BoardNav
