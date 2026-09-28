import * as React from 'react'
import { changesCount, emailsCount } from '../outboxCounts'
import { Outbox } from '../query/outbox'

const OutboxSummary: React.FC<{ outbox: Outbox }> = ({ outbox }) => (
  <div className="outbox-send__summary">
    <h2>{changesCount(outbox.changes.length)} not sent yet</h2>
    <p>
      {outbox.emails === 0
        ? 'No one follows these items, so sending only clears them.'
        : `${emailsCount(outbox.emails)} will go out, one per follower with all their changes.`}
    </p>
  </div>
)

export default OutboxSummary
