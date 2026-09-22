import { api } from '../shared/api'
import { CurrentUser } from '../shared/currentUser'
import { ItemQuery } from './board/sections/items/query/itemQuery'
import { Board, BoardChanges, BoardItem, ItemStatus } from './types'

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
    setStatus: (id: number, status: ItemStatus): Promise<{ status: ItemStatus }> =>
      api('PATCH', `/items/${id}`, { status }),
  },
  account: {
    update: (name: string): Promise<CurrentUser> =>
      api('PATCH', '/account', { name }),
  },
}
