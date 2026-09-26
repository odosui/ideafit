import * as React from 'react'
import { WeekActivity } from '../query/boardAnalytics'
import { countUnit } from './countUnit'
import WeeklyChart from './WeeklyChart'

const WeeklyActivity: React.FC<{ weeks: WeekActivity[] }> = ({ weeks }) => (
  <div className="analytics-grid">
    <WeeklyChart
      title="New items per week"
      unit={countUnit('new item', 'new items')}
      weeks={weeks}
      measure="items"
    />
    <WeeklyChart
      title="Votes per week"
      unit={countUnit('vote', 'votes')}
      weeks={weeks}
      measure="votes"
    />
  </div>
)

export default WeeklyActivity
