import * as React from 'react'
import { Board } from '../../../types'
import EmptyOutbox from './EmptyOutbox'
import OutboxChanges from './list/OutboxChanges'
import { useOutbox } from './query/useOutbox'
import SendPanel from './send/SendPanel'

interface Props {
  board: Board
}

const OutboxPage: React.FC<Props> = ({ board }) => {
  const { outbox, reload } = useOutbox(board.pid)
  if (!outbox) return <p className="items-page__note">Loading…</p>
  if (outbox.changes.length === 0) return <EmptyOutbox />

  return (
    <section className="outbox-page">
      <SendPanel pid={board.pid} outbox={outbox} onSettled={reload} />
      <OutboxChanges
        pid={board.pid}
        changes={outbox.changes}
        onDropped={reload}
      />
    </section>
  )
}

export default OutboxPage
