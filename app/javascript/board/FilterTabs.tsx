import * as React from 'react'
import { Filter } from './StateProvider'

const PUBLIC_TABS: [Filter, string][] = [
  ['all', 'All'],
  ['open', 'Open'],
  ['done', 'Done'],
]

const OWNER_TABS: [Filter, string][] = [...PUBLIC_TABS, ['rejected', 'Rejected']]

const FilterTabs: React.FC<{
  filter: Filter
  isOwner: boolean
  onChange: (filter: Filter) => void
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
