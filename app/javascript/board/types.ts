import { ItemKind } from '../shared/items/itemKind'
import { ItemStatus } from '../shared/items/itemStatus'

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
