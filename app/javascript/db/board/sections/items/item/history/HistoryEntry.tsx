import * as React from 'react'
import { formatDateTime } from '../../dates/formatDate'

interface Props {
  label: React.ReactNode
  who: string
  when: string
}

const HistoryEntry: React.FC<Props> = ({ label, who, when }) => (
  <li className="status-history__entry">
    <span className="status-history__label">{label}</span>
    <span className="status-history__meta">
      by {who} · {formatDateTime(when)}
    </span>
  </li>
)

export default HistoryEntry
