import { toneOf } from '../../../../../shared/items/itemStatus'
import { ITEM_KINDS } from '../../items/options/itemKinds'
import { ITEM_STATUSES } from '../../items/options/itemStatuses'
import { BoardAnalytics } from '../query/boardAnalytics'
import { BreakdownRow } from './breakdownRow'

export const statusRows = (analytics: BoardAnalytics): BreakdownRow[] =>
  ITEM_STATUSES.map(({ value, label }) => ({
    key: value,
    label,
    count: analytics.by_status[value] ?? 0,
    tone: toneOf(value),
  }))

export const kindRows = (analytics: BoardAnalytics): BreakdownRow[] =>
  ITEM_KINDS.map(({ value, label }) => ({
    key: value,
    label,
    count: analytics.by_kind[value] ?? 0,
    tone: 'accent',
  }))
