import * as React from 'react'
import { BoardParticipant } from '../../../../types'
import ParticipantRow from './ParticipantRow'

interface Props {
  participants: BoardParticipant[]
}

const ParticipantsTable: React.FC<Props> = ({ participants }) => (
  <table className="items-table">
    <thead>
      <tr>
        <th>Participant</th>
        <th className="items-table__votes">Items</th>
        <th className="items-table__votes">Votes</th>
        <th>Last active</th>
      </tr>
    </thead>
    <tbody>
      {participants.map((participant) => (
        <ParticipantRow key={participant.id} participant={participant} />
      ))}
    </tbody>
  </table>
)

export default ParticipantsTable
