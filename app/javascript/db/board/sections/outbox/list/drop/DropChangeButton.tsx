import * as React from 'react'
import Button from '../../../../../../shared/Button'
import { OutboxChange } from '../../query/outbox'
import { dropChange } from './dropChange'

interface Props {
  pid: string
  change: OutboxChange
  onDropped: () => void
}

const DropChangeButton: React.FC<Props> = ({ pid, change, onDropped }) => {
  const [confirming, setConfirming] = React.useState(false)
  const [dropping, setDropping] = React.useState(false)

  const drop = async () => {
    setDropping(true)
    await dropChange(pid, change)
    setDropping(false)
    setConfirming(false)
    onDropped()
  }

  if (!confirming) {
    return (
      <Button
        className="btn--ghost btn--sm"
        aria-label={`Don't send ${change.title}`}
        onClick={() => setConfirming(true)}
      >
        Don't send
      </Button>
    )
  }
  return (
    <div className="outbox-change__drop">
      <span>Drop it? No one will hear about it.</span>
      <Button className="btn--danger btn--sm" loading={dropping} onClick={drop}>
        Drop
      </Button>
      <Button
        className="btn--ghost btn--sm"
        disabled={dropping}
        onClick={() => setConfirming(false)}
      >
        Keep
      </Button>
    </div>
  )
}

export default DropChangeButton
