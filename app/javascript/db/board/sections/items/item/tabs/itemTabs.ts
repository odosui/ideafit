export type ItemTabKey = 'details' | 'history'

export interface ItemTab {
  key: ItemTabKey
  label: string
}

export const ITEM_TABS: ItemTab[] = [
  { key: 'details', label: 'Details' },
  { key: 'history', label: 'History' },
]

export const DEFAULT_ITEM_TAB: ItemTabKey = 'details'
