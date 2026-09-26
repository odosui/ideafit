import * as React from 'react'
import { ITEM_KINDS } from '../../items/options/itemKinds'
import { ItemQuery } from '../../items/query/itemQuery'
import FilterSelect from '../../items/toolbar/FilterSelect'
import SearchField from '../../items/toolbar/SearchField'

interface Props {
  query: ItemQuery
  onChange: (changes: Partial<ItemQuery>) => void
}

const ALL = { value: '' as const, label: 'All' }

const KanbanToolbar: React.FC<Props> = ({ query, onChange }) => (
  <div className="items-toolbar">
    <SearchField value={query.q} onChange={(q) => onChange({ q })} />
    <FilterSelect
      label="Kind"
      value={query.kind}
      options={[ALL, ...ITEM_KINDS]}
      onChange={(kind) => onChange({ kind })}
    />
  </div>
)

export default KanbanToolbar
