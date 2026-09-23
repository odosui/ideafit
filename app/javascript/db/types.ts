import { ItemKind } from '../shared/items/itemKind'
import { ItemStatus } from '../shared/items/itemStatus'

export interface BoardItem {
  id: number
  kind: ItemKind
  title: string
  text: string | null
  status: ItemStatus
  votes: number
  author: string
  created_at: string
}

interface HistoryEventBase {
  id: number
  by: string
  created_at: string
}

export interface StatusChange extends HistoryEventBase {
  type: 'status_change'
  status: ItemStatus
}

export interface Edit extends HistoryEventBase {
  type: 'edit'
  previous_title: string
  previous_text: string | null
}

export type HistoryEvent = StatusChange | Edit

export type ColorScheme = 'teal' | 'indigo' | 'terracotta' | 'ink' | 'plum'

export interface Board {
  id: number
  pid: string
  name: string
  description: string | null
  color_scheme: ColorScheme
  items_count: number
  created_at: string
}

export interface BoardChanges {
  name: string
  description: string
  color_scheme: ColorScheme
}
