export type ItemStatus = 'fresh' | 'planned' | 'in_progress' | 'done' | 'rejected'

export type StatusTone = 'neutral' | 'accent' | 'warning' | 'success' | 'danger'

const TONES: Record<ItemStatus, StatusTone> = {
  fresh: 'neutral',
  planned: 'accent',
  in_progress: 'warning',
  done: 'success',
  rejected: 'danger',
}

export const toneOf = (status: ItemStatus) => TONES[status]
