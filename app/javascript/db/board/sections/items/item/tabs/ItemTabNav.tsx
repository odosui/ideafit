import * as React from 'react'
import { BoardItem } from '../../../../../types'
import { itemPath } from '../itemPath'
import { ITEM_TABS, ItemTabKey } from './itemTabs'

interface Props {
  pid: string
  item: BoardItem
  active: ItemTabKey
}

const ItemTabNav: React.FC<Props> = ({ pid, item, active }) => (
  <nav className="underline-tabs" aria-label="Item sections">
    {ITEM_TABS.map((tab) => (
      <a
        key={tab.key}
        href={itemPath(pid, item.id, tab.key)}
        className={`underline-tabs__tab${tab.key === active ? ' underline-tabs__tab--active' : ''}`}
        aria-current={tab.key === active ? 'page' : undefined}
      >
        {tab.label}
      </a>
    ))}
  </nav>
)

export default ItemTabNav
