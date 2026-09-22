import * as React from 'react'
import { ItemFilter } from '../items/query/itemFilter'

const PUBLIC_TABS: [ItemFilter, string][] = [
  ['all', 'All'],
  ['open', 'Open'],
  ['done', 'Done'],
]

const OWNER_TABS: [ItemFilter, string][] = [...PUBLIC_TABS, ['rejected', 'Rejected']]

const FilterTabs: React.FC<{
  filter: ItemFilter
  isOwner: boolean
  onChange: (filter: ItemFilter) => void
}> = ({ filter, isOwner, onChange }) => (
  <div className="underline-tabs" role="tablist">
    {(isOwner ? OWNER_TABS : PUBLIC_TABS).map(([value, label]) => (
      <button
        key={value}
        type="button"
        role="tab"
        aria-selected={filter === value}
        onClick={() => onChange(value)}
        className={`underline-tabs__tab${filter === value ? ' underline-tabs__tab--active' : ''}`}
      >
        {label}
      </button>
    ))}
  </div>
)

export default FilterTabs
