import { api } from '../shared/api'
import { Item, ItemKind } from './types'

export default {
  items: {
    list: (
      board_pid: string,
      kind: ItemKind,
      filter: string,
    ): Promise<Item[]> =>
      api('get', '/items', {
        board_pid,
        kind,
        filter,
      }),
    create: (
      board_pid: string,
      kind: ItemKind,
      title: string,
      text: string,
    ): Promise<Item> => api('post', `/items`, { board_pid, kind, title, text }),
    upvote: (id: number): Promise<void> =>
      api('post', `/items/${id}/upvote`, {}),
    downvote: (id: number): Promise<void> =>
      api('post', `/items/${id}/downvote`, {}),
    del: (id: number): Promise<void> => api('DELETE', `/items/${id}`),
  },
}
