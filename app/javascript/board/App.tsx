import * as React from 'react'
import readServerData from '../shared/server'
import BoardPage from './BoardPage'
import useBoardKind from './routing/useBoardKind'
import { SignInPromptProvider } from './signIn/SignInPrompt'

const boardPid = () => {
  const { boardId } = readServerData()
  if (!boardId) throw new Error('Board pid is missing')
  return boardId
}

const BOARD_PID = boardPid()

function App() {
  const [kind, selectKind] = useBoardKind()

  return (
    <SignInPromptProvider>
      <BoardPage pid={BOARD_PID} kind={kind} onKindChange={selectKind} />
    </SignInPromptProvider>
  )
}

export default App
