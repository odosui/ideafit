export type ParticipantSort = 'recent' | 'most_items' | 'most_votes'

export const PARTICIPANT_SORTS: { value: ParticipantSort; label: string }[] = [
  { value: 'recent', label: 'Recently active' },
  { value: 'most_items', label: 'Most items' },
  { value: 'most_votes', label: 'Most votes' },
]
