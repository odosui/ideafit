import * as React from 'react'
import { Board } from '../types'
import { currentSettingsTab } from './tabs/currentSettingsTab'
import SettingsTabContent from './tabs/SettingsTabContent'
import SettingsTabNav from './tabs/SettingsTabNav'

interface Props {
  board: Board
}

const BoardSettingsPage: React.FC<Props> = ({ board }) => {
  const tab = currentSettingsTab()

  return (
    <div className="settings-page">
      <SettingsTabNav pid={board.pid} active={tab} />
      <SettingsTabContent board={board} tab={tab} />
    </div>
  )
}

export default BoardSettingsPage
