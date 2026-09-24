import { api } from '../shared/api'
import { CurrentUser } from '../shared/currentUser'
import { AccountChanges } from './account/accountChanges'
import { ItemQuery } from './board/sections/items/query/itemQuery'
import { ItemStatus } from '../shared/items/itemStatus'
import { Board, BoardChanges, BoardItem, HistoryEvent } from './types'

export default {
  boards: {
    list: (): Promise<Board[]> => api('get', '/boards'),
    create: (name: string, description: string): Promise<Board> =>
      api('post', '/boards', { name, description }),
    update: (pid: string, changes: BoardChanges): Promise<Board> =>
      api('PATCH', `/boards/${pid}`, { ...changes }),
    remove: (pid: string): Promise<{ success: boolean }> =>
      api('DELETE', `/boards/${pid}`),
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
  account: {
    update: (changes: AccountChanges): Promise<CurrentUser> =>
      api('PATCH', '/account', { ...changes }),
  },
}
