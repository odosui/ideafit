import * as React from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchField: React.FC<Props> = ({ value, onChange }) => (
  <label className="items-toolbar__search">
    <i className="fas fa-search" aria-hidden="true" />
    <input
      className="input"
      type="search"
      placeholder="Search items"
      aria-label="Search items"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
)

export default SearchField
