import * as React from 'react'
import { BoardView } from '../../routing/boardView'
import { useHasBoardSettings } from '../../settings/useHasBoardSettings'
import BoardNavLink from './BoardNavLink'
import SettingsIcon from './SettingsIcon'

interface Props {
  view: BoardView
  onChange: (view: BoardView) => void
}

const SettingsNavLink: React.FC<Props> = ({ view, onChange }) => {
  if (!useHasBoardSettings() && view !== 'settings') return null

  return (
    <>
      <hr className="board-nav__divider" />
      <BoardNavLink
        view="settings"
        label="Settings"
        icon={<SettingsIcon />}
        active={view === 'settings'}
        onSelect={onChange}
      />
    </>
  )
}

export default SettingsNavLink
