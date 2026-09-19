import * as React from 'react'
import BoardsPage from './BoardsPage'
import BoardSettingsPage from './settings/BoardSettingsPage'
import Shell from './Shell'

const App: React.FC = () => (
  <Shell>
    {window.board ? <BoardSettingsPage board={window.board} /> : <BoardsPage />}
  </Shell>
)

export default App
