import * as React from 'react'
import { ITEM_KINDS } from '../options/itemKinds'
import { ITEM_SORTS } from '../options/itemSorts'
import { ITEM_STATUSES } from '../options/itemStatuses'
import { ItemQuery } from '../query/itemQuery'
import FilterSelect from './FilterSelect'
import SearchField from './SearchField'

interface Props {
  query: ItemQuery
  onChange: (changes: Partial<ItemQuery>) => void
}

const ALL = { value: '' as const, label: 'All' }

const ItemsToolbar: React.FC<Props> = ({ query, onChange }) => (
  <div className="items-toolbar">
    <SearchField value={query.q} onChange={(q) => onChange({ q })} />
    <FilterSelect
      label="Kind"
      value={query.kind}
      options={[ALL, ...ITEM_KINDS]}
      onChange={(kind) => onChange({ kind })}
    />
    <FilterSelect
      label="Status"
      value={query.status}
      options={[ALL, ...ITEM_STATUSES]}
      onChange={(status) => onChange({ status })}
    />
    <FilterSelect
      label="Sort"
      value={query.sort}
      options={ITEM_SORTS}
      onChange={(sort) => onChange({ sort })}
    />
  </div>
)

export default ItemsToolbar
