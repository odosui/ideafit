import * as React from 'react'
import { peopleCount } from '../outboxCounts'
import { OutboxRecipient } from '../query/outbox'

interface Props {
  recipients: OutboxRecipient[]
}

const RecipientList: React.FC<Props> = ({ recipients }) => {
  if (recipients.length === 0)
    return <p className="outbox-change__nobody">No one to email</p>

  return (
    <details className="outbox-recipients">
      <summary>To {peopleCount(recipients.length)}</summary>
      <ul>
        {recipients.map((recipient) => (
          <li key={recipient.id}>
            {recipient.name && <strong>{recipient.name} </strong>}
            <span>{recipient.email}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default RecipientList
