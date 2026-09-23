import * as React from 'react'
import readServerData from '../shared/server'
import { ItemKind } from '../shared/items/itemKind'
import BoardAside from './aside/BoardAside'
import Header from './Header'
import ItemsPanel from './items/ItemsPanel'

const { embedded } = readServerData()

interface Props {
  pid: string
  kind: ItemKind
  onKindChange: (kind: ItemKind) => void
}

const BoardPage: React.FC<Props> = ({ pid, kind, onKindChange }) => (
  <div className="board-page">
    {!embedded && <Header />}
    <div className="board-layout">
      <BoardAside kind={kind} onKindChange={onKindChange} />
      <main className="board-main">
        <ItemsPanel pid={pid} kind={kind} />
      </main>
    </div>
  </div>
)

export default BoardPage
