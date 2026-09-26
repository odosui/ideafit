export type ItemStatus =
  'fresh' | 'planned' | 'in_progress' | 'ready' | 'done' | 'rejected'

export type StatusTone =
  'neutral' | 'accent' | 'warning' | 'info' | 'success' | 'danger'

const TONES: Record<ItemStatus, StatusTone> = {
  fresh: 'neutral',
  planned: 'accent',
  in_progress: 'warning',
  ready: 'info',
  done: 'success',
  rejected: 'danger',
}

export const toneOf = (status: ItemStatus) => TONES[status]
