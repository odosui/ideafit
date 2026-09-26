import * as React from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  label?: string
}

const SearchField: React.FC<Props> = ({
  value,
  onChange,
  label = 'Search items',
}) => (
  <label className="items-toolbar__search">
    <i className="fas fa-search" aria-hidden="true" />
    <input
      className="input"
      type="search"
      placeholder={label}
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
)

export default SearchField
