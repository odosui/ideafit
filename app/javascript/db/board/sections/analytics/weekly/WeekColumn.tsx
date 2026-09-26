import * as React from 'react'
import { formatWeek } from './formatWeek'

interface Props {
  week: string
  value: number
  max: number
  unit: (count: number) => string
  peak: boolean
}

const WeekColumn: React.FC<Props> = ({ week, value, max, unit, peak }) => {
  const description = `${value} ${unit(value)}, week of ${formatWeek(week)}`

  return (
    <li className="week-column" aria-label={description}>
      <span
        className="week-column__bar"
        style={{ height: `${max ? (value / max) * 100 : 0}%` }}
      >
        {peak && <span className="week-column__peak">{value}</span>}
      </span>
      <span className="week-column__tip" role="tooltip">
        <strong>{value}</strong> {unit(value)}
        <span>Week of {formatWeek(week)}</span>
      </span>
    </li>
  )
}

export default WeekColumn
