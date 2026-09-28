import * as React from 'react'
import readServerData from '../shared/server'
import BoardPage from './BoardPage'
import { connectToHost } from './embedIdentity/connectToHost'
import useBoardView from './routing/useBoardView'
import { SignInPromptProvider } from './signIn/SignInPrompt'

const boardPid = () => {
  const { boardId } = readServerData()
  if (!boardId) throw new Error('Board pid is missing')
  return boardId
}

const BOARD_PID = boardPid()

if (readServerData().embedded) connectToHost(BOARD_PID)

function App() {
  const [view, selectView] = useBoardView()

  return (
    <SignInPromptProvider>
      <BoardPage pid={BOARD_PID} view={view} onViewChange={selectView} />
    </SignInPromptProvider>
  )
}

export default App
