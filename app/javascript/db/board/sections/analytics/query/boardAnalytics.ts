import { ItemKind } from '../../../../../shared/items/itemKind'
import { ItemStatus } from '../../../../../shared/items/itemStatus'

export interface AnalyticsTotals {
  items: number
  votes: number
  participants: number
  shipped: number
}

export interface WeekActivity {
  week: string
  items: number
  votes: number
}

export interface TopItem {
  id: number
  title: string
  status: ItemStatus
  votes: number
}

export interface BoardAnalytics {
  totals: AnalyticsTotals
  by_status: Partial<Record<ItemStatus, number>>
  by_kind: Partial<Record<ItemKind, number>>
  weekly: WeekActivity[]
  top_items: TopItem[]
}
