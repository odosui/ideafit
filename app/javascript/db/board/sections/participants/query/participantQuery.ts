import { ParticipantSort } from '../options/participantSorts'

export type ParticipantQuery = {
  q: string
  sort: ParticipantSort
}

export const DEFAULT_PARTICIPANT_QUERY: ParticipantQuery = {
  q: '',
  sort: 'recent',
}
