import { ItemKind, ItemStatus } from '../../../../types'
import { ItemSort } from '../options/itemSorts'

export type ItemQuery = {
  kind: ItemKind | ''
  status: ItemStatus | ''
  q: string
  sort: ItemSort
}

export const DEFAULT_ITEM_QUERY: ItemQuery = {
  kind: '',
  status: '',
  q: '',
  sort: 'newest',
}
