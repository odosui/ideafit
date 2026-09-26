import { ItemQuery } from '../query/itemQuery'

export const itemsCsvPath = (pid: string, query: ItemQuery) =>
  `/api/boards/${pid}/items.csv?${new URLSearchParams(query)}`
