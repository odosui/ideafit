import * as React from 'react'
import { ItemKind } from '../../shared/items/itemKind'
import BoardIntro from './BoardIntro'
import KindTabs from './KindTabs'

interface Props {
  kind: ItemKind
  onKindChange: (kind: ItemKind) => void
}

const BoardAside: React.FC<Props> = ({ kind, onKindChange }) => (
  <aside className="board-aside">
    <BoardIntro />
    <KindTabs kind={kind} onChange={onKindChange} />
  </aside>
)

export default BoardAside
