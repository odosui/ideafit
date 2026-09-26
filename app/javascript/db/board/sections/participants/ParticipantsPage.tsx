import * as React from 'react'
import { Board } from '../../../types'
import ParticipantsResult from './list/ParticipantsResult'
import {
  DEFAULT_PARTICIPANT_QUERY,
  ParticipantQuery,
} from './query/participantQuery'
import { useBoardParticipants } from './query/useBoardParticipants'
import ParticipantsToolbar from './toolbar/ParticipantsToolbar'

interface Props {
  board: Board
}

const ParticipantsPage: React.FC<Props> = ({ board }) => {
  const [query, setQuery] = React.useState(DEFAULT_PARTICIPANT_QUERY)
  const participants = useBoardParticipants(board.pid, query)

  const changeQuery = (changes: Partial<ParticipantQuery>) =>
    setQuery((prev) => ({ ...prev, ...changes }))

  return (
    <section className="items-page">
      <ParticipantsToolbar query={query} onChange={changeQuery} />
      <ParticipantsResult participants={participants} />
    </section>
  )
}

export default ParticipantsPage
