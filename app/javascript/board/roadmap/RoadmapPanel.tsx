import * as React from 'react'
import Spinner from '../../shared/Spinner'
import { useVoteToggle } from '../items/voting/useVoteToggle'
import RoadmapColumn from './columns/RoadmapColumn'
import { ROADMAP_COLUMNS, itemsInColumn } from './columns/roadmapColumns'
import { useRoadmapItems } from './query/useRoadmapItems'

const RoadmapPanel: React.FC<{ pid: string }> = ({ pid }) => {
  const { items, replaceItem } = useRoadmapItems(pid)
  const toggleVote = useVoteToggle(replaceItem)

  if (!items) {
    return (
      <div className="board-loading">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="roadmap">
      {ROADMAP_COLUMNS.map((column) => (
        <RoadmapColumn
          key={column.title}
          title={column.title}
          items={itemsInColumn(items, column)}
          onVote={toggleVote}
        />
      ))}
    </div>
  )
}

export default RoadmapPanel
