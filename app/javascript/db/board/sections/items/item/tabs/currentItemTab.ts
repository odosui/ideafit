import { DEFAULT_ITEM_TAB, ITEM_TABS, ItemTabKey } from './itemTabs'

const tabSegment = (pathname: string) => pathname.split('/')[6]

export const currentItemTab = (): ItemTabKey => {
  const key = tabSegment(window.location.pathname)
  return ITEM_TABS.find((tab) => tab.key === key)?.key ?? DEFAULT_ITEM_TAB
}
