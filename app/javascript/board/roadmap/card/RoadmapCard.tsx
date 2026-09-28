import * as React from 'react'
import KindIcon from '../../../shared/items/KindIcon'
import StatusBadge from '../../items/list/StatusBadge'
import Voter from '../../items/voting/Voter'
import { Item } from '../../types'

interface Props {
  item: Item
  onVote: (item: Item) => void
}

const RoadmapCard: React.FC<Props> = ({ item, onVote }) => (
  <li className="roadmap-card">
    <div className="roadmap-card__body">
      <h3 className="roadmap-card__title">
        <span className="roadmap-card__kind">
          <KindIcon kind={item.kind} />
        </span>
        {item.title}
      </h3>
      {item.status === 'ready' && <StatusBadge status="ready" />}
    </div>
    <Voter voted={item.voted} count={item.votes} onClick={() => onVote(item)} />
  </li>
)

export default RoadmapCard
