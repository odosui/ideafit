import * as React from 'react'
import { SETTINGS_PATH } from '../shared/settingsPath'
import AccountPage from './account/AccountPage'
import { CurrentUserProvider } from './account/CurrentUserContext'
import BoardDashboard from './board/BoardDashboard'
import BoardsPage from './BoardsPage'
import ParticipantHomePage from './participant/ParticipantHomePage'
import Shell from './Shell'

const CurrentPage: React.FC = () => {
  if (window.board) return <BoardDashboard board={window.board} item={window.item} />
  if (window.participantBoards)
    return <ParticipantHomePage boards={window.participantBoards} />
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
