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
