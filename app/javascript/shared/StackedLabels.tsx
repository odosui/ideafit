import * as React from 'react'

interface Props {
  labels: string[]
  current: string
}

// Shows `current` but takes the width of the longest label,
// so controls with different values line up.
const StackedLabels: React.FC<Props> = ({ labels, current }) => (
  <span className="stacked-labels" aria-hidden="true">
    {labels.map((label) => (
      <span
        key={label}
        className={label === current ? undefined : 'stacked-labels__hidden'}
      >
        {label}
      </span>
    ))}
  </span>
)

export default StackedLabels
