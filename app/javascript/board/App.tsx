import * as React from 'react'
import BoardPage from './BoardPage'
import LoginFormModal from './LoginFormModal'
import { StateProvider } from './StateProvider'
import useBoardKind from './routing/useBoardKind'

function App() {
  const [kind, selectKind] = useBoardKind()

  return (
    <StateProvider kindTab={kind}>
      <LoginFormModal />
      <BoardPage onKindChange={selectKind} />
    </StateProvider>
  )
}

export default App
