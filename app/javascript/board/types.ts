export type ItemKind = 'idea' | 'bug' | 'question'

export type ItemStatus = 'fresh' | 'in_progress' | 'done' | 'rejected'

export interface Item {
  id: number
  title: string
  text: string | null
  kind: ItemKind
  voted: boolean
  votes: number
  status: ItemStatus
  can_edit: boolean
}
