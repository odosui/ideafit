export type ItemKind = 'idea' | 'bug' | 'question'

export type ItemStatus = 'fresh' | 'planned' | 'in_progress' | 'done' | 'rejected'

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

export interface StatusChange {
  id: number
  status: ItemStatus
  changed_by: string
  created_at: string
}

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
