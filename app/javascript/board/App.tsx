import * as React from 'react'
import readServerData from '../shared/server'
import BoardPage from './BoardPage'
import { connectToHost } from './embedIdentity/connectToHost'
import useBoardKind from './routing/useBoardKind'
import { SignInPromptProvider } from './signIn/SignInPrompt'

const boardPid = () => {
  const { boardId } = readServerData()
  if (!boardId) throw new Error('Board pid is missing')
  return boardId
}

const BOARD_PID = boardPid()

if (readServerData().embedded) connectToHost(BOARD_PID)

function App() {
  const [kind, selectKind] = useBoardKind()

  return (
    <SignInPromptProvider>
      <BoardPage pid={BOARD_PID} kind={kind} onKindChange={selectKind} />
    </SignInPromptProvider>
  )
}

export default App
