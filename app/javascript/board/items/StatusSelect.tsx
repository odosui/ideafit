import * as React from 'react'
import { ItemStatus } from '../types'

const STATUS_OPTIONS: [ItemStatus, string][] = [
  ['fresh', 'New'],
  ['in_progress', 'In progress'],
  ['done', 'Done'],
  ['rejected', 'Rejected'],
]

const StatusSelect: React.FC<{
  status: ItemStatus
  onChange: (status: ItemStatus) => void
}> = ({ status, onChange }) => (
  <select
    className="select select--sm"
    aria-label="Status"
    value={status}
    onChange={(e) => onChange(e.target.value as ItemStatus)}
  >
    {STATUS_OPTIONS.map(([value, label]) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
)

export default StatusSelect
