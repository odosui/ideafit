import * as React from 'react'
import { BreakdownRow } from './breakdownRow'

const share = (count: number, max: number) => (max ? (count / max) * 100 : 0)

const BreakdownBars: React.FC<{ rows: BreakdownRow[] }> = ({ rows }) => {
  const max = Math.max(...rows.map((row) => row.count))

  return (
    <dl className="breakdown">
      {rows.map((row) => (
        <div key={row.key} className={`breakdown__row breakdown--${row.tone}`}>
          <dt className="breakdown__label">{row.label}</dt>
          <dd className="breakdown__bar">
            <span
              className="breakdown__fill"
              style={{ width: `${share(row.count, max)}%` }}
            />
            <span className="breakdown__value">{row.count}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default BreakdownBars
