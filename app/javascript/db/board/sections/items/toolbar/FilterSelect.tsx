import * as React from 'react'

interface Option<T extends string> {
  value: T
  label: string
}

interface Props<T extends string> {
  label: string
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}

const FilterSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
}: Props<T>) => {
  const selected = options.find((option) => option.value === value)

  return (
    <div className="filter-select">
      <span className="filter-select__label" aria-hidden="true">
        {label}
      </span>
      <span className="filter-select__value" aria-hidden="true">
        {selected?.label}
      </span>
      <i
        className="fas fa-chevron-down filter-select__chevron"
        aria-hidden="true"
      />
      <select
        className="filter-select__control"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect
