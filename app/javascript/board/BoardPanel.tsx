import * as React from 'react'
import ItemsPanel from './items/ItemsPanel'
import RoadmapPanel from './roadmap/RoadmapPanel'
import { BoardView, isKindView } from './routing/boardView'
import SettingsPanel from './settings/SettingsPanel'

interface Props {
  pid: string
  view: BoardView
}

const BoardPanel: React.FC<Props> = ({ pid, view }) => {
  if (isKindView(view)) return <ItemsPanel pid={pid} kind={view} />
  if (view === 'settings') return <SettingsPanel />
  return <RoadmapPanel pid={pid} />
}

export default BoardPanel
