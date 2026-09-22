import * as React from 'react'
import { Board } from '../../types'
import BoardSwitcherMenu from './BoardSwitcherMenu'
import { useDismiss } from './useDismiss'

interface Props {
  current: Board
}

const BoardSwitcher: React.FC<Props> = ({ current }) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  useDismiss(ref, open, () => setOpen(false))

  return (
    <div className="board-switcher" ref={ref}>
      <button
        type="button"
        className="board-switcher__toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Switch board, current: ${current.name}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="board-switcher__caption">Board</span>
        <span className="board-switcher__name">{current.name}</span>
        <i className="fas fa-chevron-down" aria-hidden="true" />
      </button>
      {open && <BoardSwitcherMenu current={current} />}
    </div>
  )
}

export default BoardSwitcher
