import { ItemKind } from '../../../../../shared/items/itemKind'
import { ItemStatus } from '../../../../../shared/items/itemStatus'

export interface OutboxRecipient {
  id: number
  name: string | null
  email: string
}

export interface OutboxChange {
  item_id: number
  title: string
  kind: ItemKind
  status: ItemStatus
  recipients: OutboxRecipient[]
}

export interface Outbox {
  fingerprint: string
  emails: number
  changes: OutboxChange[]
}

export type OutboxDelivery =
  { success: true; emails: number } | { success: false; error: string }
