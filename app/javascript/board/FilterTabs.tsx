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
  <div className="tabbed-tabs" role="tablist">
    {(isOwner ? OWNER_TABS : PUBLIC_TABS).map(([value, label]) => (
      <h3
        key={value}
        role="tab"
        aria-selected={filter === value}
        onClick={() => onChange(value)}
        className={filter === value ? 'active' : ''}
      >
        {label}
      </h3>
    ))}
  </div>
)

export default FilterTabs
