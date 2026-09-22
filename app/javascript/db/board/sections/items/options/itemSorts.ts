export type ItemSort = 'newest' | 'oldest' | 'most_voted'

export const ITEM_SORTS: { value: ItemSort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'most_voted', label: 'Most voted' },
]
