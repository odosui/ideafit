import * as React from 'react'
import readServerData from '../shared/server'
import BoardAside from './aside/BoardAside'
import BoardPanel from './BoardPanel'
import EmailConsentBanner from './emailConsent/EmailConsentBanner'
import Header from './Header'
import { BoardView } from './routing/boardView'

const { embedded } = readServerData()

interface Props {
  pid: string
  view: BoardView
  onViewChange: (view: BoardView) => void
}

const BoardPage: React.FC<Props> = ({ pid, view, onViewChange }) => (
  <div className="board-page">
    {!embedded && <Header />}
    <div className="board-layout">
      <BoardAside view={view} onViewChange={onViewChange} />
      <main className="board-main">
        <EmailConsentBanner />
        <BoardPanel pid={pid} view={view} />
      </main>
    </div>
  </div>
)

export default BoardPage
