import { api } from '../shared/api'
import { CurrentUser } from '../shared/currentUser'
import { AccountChanges } from './account/accountChanges'
import { BoardAnalytics } from './board/sections/analytics/query/boardAnalytics'
import { ItemQuery } from './board/sections/items/query/itemQuery'
import { Outbox, OutboxDelivery } from './board/sections/outbox/query/outbox'
import {
  EmbedEmails,
  EmbedEmailsRejection,
} from './board/sections/share/emails/embedEmails'
import { EmbedSecret } from './board/sections/share/identity/embedSecret'
import { ImportResult } from './settings/transfer/importResult'
import { ParticipantQuery } from './board/sections/participants/query/participantQuery'
import { ItemStatus } from '../shared/items/itemStatus'
import {
  Board,
  BoardChanges,
  BoardItem,
  BoardParticipant,
  HistoryEvent,
} from './types'

export default {
  boards: {
    list: (): Promise<Board[]> => api('get', '/boards'),
    create: (name: string, description: string): Promise<Board> =>
      api('post', '/boards', { name, description }),
    update: (pid: string, changes: BoardChanges): Promise<Board> =>
      api('PATCH', `/boards/${pid}`, { ...changes }),
    remove: (pid: string): Promise<{ success: boolean }> =>
      api('DELETE', `/boards/${pid}`),
    import: (pid: string, document: string): Promise<ImportResult> =>
      api('post', `/boards/${pid}/import`, { document }),
  },
  embedSecret: {
    show: (pid: string): Promise<EmbedSecret> =>
      api('get', `/boards/${pid}/embed_secret`),
    regenerate: (pid: string): Promise<EmbedSecret> =>
      api('post', `/boards/${pid}/embed_secret`, {}),
  },
  embedEmails: {
    show: (pid: string): Promise<EmbedEmails> =>
      api('get', `/boards/${pid}/embed_emails`),
    update: (
      pid: string,
      settings: { trust_emails: boolean; page_url: string },
    ): Promise<EmbedEmails | EmbedEmailsRejection> =>
      api('PATCH', `/boards/${pid}/embed_emails`, settings),
  },
  items: {
    list: (pid: string, query: ItemQuery): Promise<BoardItem[]> =>
      api('get', `/boards/${pid}/items`, query),
    setStatus: (
      id: number,
      status: ItemStatus,
    ): Promise<{ status: ItemStatus }> =>
      api('PATCH', `/items/${id}`, { status }),
    history: (id: number): Promise<HistoryEvent[]> =>
      api('get', `/items/${id}/history`),
  },
  outbox: {
    show: (pid: string): Promise<Outbox> => api('get', `/boards/${pid}/outbox`),
    deliver: (pid: string, fingerprint: string): Promise<OutboxDelivery> =>
      api('post', `/boards/${pid}/outbox/delivery`, { fingerprint }),
    drop: (
      pid: string,
      itemId: number,
      status: ItemStatus,
    ): Promise<{ success: boolean; error?: string }> =>
      api('DELETE', `/boards/${pid}/outbox/changes/${itemId}`, { status }),
  },
  participants: {
    list: (pid: string, query: ParticipantQuery): Promise<BoardParticipant[]> =>
      api('get', `/boards/${pid}/participants`, query),
  },
  analytics: {
    show: (pid: string): Promise<BoardAnalytics> =>
      api('get', `/boards/${pid}/analytics`),
  },
  account: {
    update: (changes: AccountChanges): Promise<CurrentUser> =>
      api('PATCH', '/account', { ...changes }),
  },
}
