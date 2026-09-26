export type BoardSectionKey =
  'share' | 'settings' | 'kanban' | 'items' | 'participants' | 'analytics'

export interface BoardSection {
  key: BoardSectionKey
  label: string
  icon: string
}

export const BOARD_SECTIONS: BoardSection[] = [
  { key: 'items', label: 'Items', icon: 'fas fa-list' },
  { key: 'kanban', label: 'Kanban', icon: 'fas fa-columns' },
  { key: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
  { key: 'participants', label: 'Participants', icon: 'fas fa-users' },
  { key: 'share', label: 'Share', icon: 'fas fa-share-alt' },
  { key: 'settings', label: 'Settings', icon: 'fas fa-sliders-h' },
]

export const DEFAULT_BOARD_SECTION: BoardSectionKey = 'share'
