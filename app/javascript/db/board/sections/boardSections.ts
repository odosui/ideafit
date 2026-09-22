export type BoardSectionKey =
  | 'share'
  | 'settings'
  | 'kanban'
  | 'items'
  | 'participants'
  | 'analytics'

export interface BoardSection {
  key: BoardSectionKey
  label: string
  icon: string
}

export const BOARD_SECTIONS: BoardSection[] = [
  { key: 'share', label: 'Share', icon: 'fas fa-share-alt' },
  { key: 'settings', label: 'Settings', icon: 'fas fa-sliders-h' },
  { key: 'kanban', label: 'Kanban', icon: 'fas fa-columns' },
  { key: 'items', label: 'Items', icon: 'fas fa-list' },
  { key: 'participants', label: 'Participants', icon: 'fas fa-users' },
  { key: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
]

export const DEFAULT_BOARD_SECTION: BoardSectionKey = 'share'
