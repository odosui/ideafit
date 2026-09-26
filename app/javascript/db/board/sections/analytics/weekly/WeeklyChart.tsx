import * as React from 'react'
import AnalyticsCard from '../AnalyticsCard'
import { WeekActivity } from '../query/boardAnalytics'
import { formatWeek } from './formatWeek'
import WeekColumn from './WeekColumn'

interface Props {
  title: string
  unit: (count: number) => string
  weeks: WeekActivity[]
  measure: 'items' | 'votes'
}

const WeeklyChart: React.FC<Props> = ({ title, unit, weeks, measure }) => {
  const values = weeks.map((week) => week[measure])
  const max = Math.max(...values)
  const peakIndex = max ? values.lastIndexOf(max) : -1

  return (
    <AnalyticsCard title={title}>
      <ol className="week-chart">
        {weeks.map((week, index) => (
          <WeekColumn
            key={week.week}
            week={week.week}
            value={week[measure]}
            max={max}
            unit={unit}
            peak={index === peakIndex}
          />
        ))}
      </ol>
      <div className="week-chart__axis" aria-hidden="true">
        <span>{formatWeek(weeks[0].week)}</span>
        <span>This week</span>
      </div>
    </AnalyticsCard>
  )
}

export default WeeklyChart
