import * as React from 'react'
import readServerData from '../shared/server'
import BoardAside from './aside/BoardAside'
import Header from './Header'
import ItemsPanel from './items/ItemsPanel'
import RoadmapPanel from './roadmap/RoadmapPanel'
import { BoardView, isKindView } from './routing/boardView'

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
        {isKindView(view) ? (
          <ItemsPanel pid={pid} kind={view} />
        ) : (
          <RoadmapPanel pid={pid} />
        )}
      </main>
    </div>
  </div>
)

export default BoardPage
