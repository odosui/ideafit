import * as React from 'react'
import { useDebouncedValue } from '../../../../../shared/hooks/useDebouncedValue'
import api from '../../../../api'
import { BoardParticipant } from '../../../../types'
import { ParticipantQuery } from './participantQuery'

const SEARCH_DELAY_MS = 300

export const useBoardParticipants = (pid: string, query: ParticipantQuery) => {
  const [participants, setParticipants] = React.useState<
    BoardParticipant[] | null
  >(null)
  const q = useDebouncedValue(query.q, SEARCH_DELAY_MS)
  const { sort } = query

  React.useEffect(() => {
    let current = true
    api.participants.list(pid, { sort, q }).then((data) => {
      if (current) setParticipants(data || [])
    })
    return () => {
      current = false
    }
  }, [pid, sort, q])

  return participants
}
