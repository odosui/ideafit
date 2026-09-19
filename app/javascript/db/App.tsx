import * as React from 'react'
import { SETTINGS_PATH } from '../shared/settingsPath'
import AccountPage from './account/AccountPage'
import { CurrentUserProvider } from './account/CurrentUserContext'
import BoardsPage from './BoardsPage'
import BoardSettingsPage from './settings/BoardSettingsPage'
import Shell from './Shell'

const CurrentPage: React.FC = () => {
  if (window.board) return <BoardSettingsPage board={window.board} />
  if (window.location.pathname === SETTINGS_PATH) return <AccountPage />
  return <BoardsPage />
}

const App: React.FC = () => (
  <CurrentUserProvider>
    <Shell>
      <CurrentPage />
    </Shell>
  </CurrentUserProvider>
)

export default App
