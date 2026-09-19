import * as React from 'react'
import { ItemStatus } from '../types'

const BADGES: Partial<Record<ItemStatus, string>> = {
  done: 'DONE',
  in_progress: 'WORK IN PROGRESS',
  rejected: 'REJECTED',
}

const StatusBadge: React.FC<{ status: ItemStatus }> = ({ status }) => {
  const badge = BADGES[status]
  if (!badge) return null

  return <span className={`status ${status}`}>{badge}</span>
}

export default StatusBadge
