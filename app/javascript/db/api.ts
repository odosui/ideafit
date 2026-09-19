import { api } from '../shared/api'
import { CurrentUser } from '../shared/currentUser'
import { Board, BoardChanges } from './types'

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
  account: {
    update: (name: string): Promise<CurrentUser> =>
      api('PATCH', '/account', { name }),
  },
}
