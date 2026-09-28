import * as React from 'react'
import { itemPath } from '../../items/item/itemPath'
import StatusChip from '../../items/status/StatusChip'
import { OutboxChange } from '../query/outbox'
import DropChangeButton from './drop/DropChangeButton'
import RecipientList from './RecipientList'

interface Props {
  pid: string
  change: OutboxChange
  onDropped: () => void
}

const OutboxChangeCard: React.FC<Props> = ({ pid, change, onDropped }) => (
  <li className="outbox-change">
    <div className="outbox-change__head">
      <a className="outbox-change__title" href={itemPath(pid, change.item_id)}>
        {change.title}
      </a>
      <StatusChip status={change.status} />
    </div>
    <div className="outbox-change__foot">
      <RecipientList recipients={change.recipients} />
      <DropChangeButton pid={pid} change={change} onDropped={onDropped} />
    </div>
  </li>
)

export default OutboxChangeCard
