import * as React from 'react'
import { boardPathForView } from '../../routing/boardLocation'
import { BoardView } from '../../routing/boardView'

interface Props {
  view: BoardView
  label: string
  icon: React.ReactNode
  active: boolean
  onSelect: (view: BoardView) => void
}

const opensInNewTab = (e: React.MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0

const BoardNavLink: React.FC<Props> = ({
  view,
  label,
  icon,
  active,
  onSelect,
}) => (
  <a
    href={boardPathForView(view)}
    aria-current={active ? 'page' : undefined}
    className={`board-nav__link${active ? ' board-nav__link--active' : ''}`}
    onClick={(e) => {
      if (opensInNewTab(e)) return
      e.preventDefault()
      onSelect(view)
    }}
  >
    {icon}
    {label}
  </a>
)

export default BoardNavLink
