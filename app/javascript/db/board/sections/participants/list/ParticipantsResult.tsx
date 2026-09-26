import * as React from 'react'
import { BoardParticipant } from '../../../../types'
import ParticipantsTable from './ParticipantsTable'

interface Props {
  participants: BoardParticipant[] | null
}

const ParticipantsResult: React.FC<Props> = ({ participants }) => {
  if (participants === null) return <p className="items-page__note">Loading…</p>
  if (participants.length === 0)
    return <p className="items-page__note">No participants found.</p>
  return <ParticipantsTable participants={participants} />
}

export default ParticipantsResult
