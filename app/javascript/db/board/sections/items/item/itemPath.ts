import { DEFAULT_ITEM_TAB, ItemTabKey } from './tabs/itemTabs'

export const itemPath = (
  pid: string,
  id: number,
  tab: ItemTabKey = DEFAULT_ITEM_TAB,
) => {
  const base = `/db/boards/${pid}/items/${id}`
  return tab === DEFAULT_ITEM_TAB ? base : `${base}/${tab}`
}
