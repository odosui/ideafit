import { CounterTone } from '../../sidebar/counter/counterTone'
import { BoardCounts } from '../counts/boardCounts'

export type BoardSectionKey =
  | 'share'
  | 'settings'
  | 'kanban'
  | 'items'
  | 'outbox'
  | 'participants'
  | 'analytics'

export interface SectionCounter {
  count: keyof BoardCounts
  tone: CounterTone
}

export interface BoardSection {
  key: BoardSectionKey
  label: string
  icon: string
  counter?: SectionCounter
}

export const BOARD_SECTIONS: BoardSection[] = [
  {
    key: 'items',
    label: 'Items',
    icon: 'fas fa-list',
    counter: { count: 'new_items', tone: 'stat' },
  },
  { key: 'kanban', label: 'Kanban', icon: 'fas fa-columns' },
  {
    key: 'outbox',
    label: 'Outbox',
    icon: 'fas fa-paper-plane',
    counter: { count: 'outbox', tone: 'action' },
  },
  { key: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
  {
    key: 'participants',
    label: 'Participants',
    icon: 'fas fa-users',
    counter: { count: 'participants', tone: 'stat' },
  },
  { key: 'share', label: 'Share', icon: 'fas fa-share-alt' },
  { key: 'settings', label: 'Settings', icon: 'fas fa-sliders-h' },
]

export const DEFAULT_BOARD_SECTION: BoardSectionKey = 'share'
