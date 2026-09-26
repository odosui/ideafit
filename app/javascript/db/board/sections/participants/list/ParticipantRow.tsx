import * as React from 'react'
import { BoardParticipant } from '../../../../types'
import { formatDate } from '../../items/dates/formatDate'

interface Props {
  participant: BoardParticipant
}

const ParticipantRow: React.FC<Props> = ({ participant }) => (
  <tr className="items-table__row">
    <td className="items-table__main">
      <span className="participants-table__name">
        {participant.name || participant.email}
      </span>
      {participant.name && (
        <span className="items-table__text">{participant.email}</span>
      )}
    </td>
    <td className="items-table__votes">{participant.items}</td>
    <td className="items-table__votes">{participant.votes}</td>
    <td className="items-table__muted">
      {formatDate(participant.last_active_at)}
    </td>
  </tr>
)

export default ParticipantRow
