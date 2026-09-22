import * as React from 'react'
import { ItemStatus } from '../types'

const BADGES: Partial<Record<ItemStatus, [string, string]>> = {
  planned: ['Planned', 'chip--accent'],
  done: ['Done', 'chip--success'],
  in_progress: ['Work in progress', 'chip--warning'],
  rejected: ['Rejected', 'chip--danger'],
}

const StatusBadge: React.FC<{ status: ItemStatus }> = ({ status }) => {
  const badge = BADGES[status]
  if (!badge) return null

  const [label, tone] = badge
  return <span className={`chip ${tone}`}>{label}</span>
}

export default StatusBadge
