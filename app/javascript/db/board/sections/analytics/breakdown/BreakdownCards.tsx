import * as React from 'react'
import AnalyticsCard from '../AnalyticsCard'
import { BoardAnalytics } from '../query/boardAnalytics'
import BreakdownBars from './BreakdownBars'
import { kindRows, statusRows } from './breakdownRows'

const BreakdownCards: React.FC<{ analytics: BoardAnalytics }> = ({
  analytics,
}) => (
  <div className="analytics-grid">
    <AnalyticsCard title="Items by status">
      <BreakdownBars rows={statusRows(analytics)} />
    </AnalyticsCard>
    <AnalyticsCard title="Items by kind">
      <BreakdownBars rows={kindRows(analytics)} />
    </AnalyticsCard>
  </div>
)

export default BreakdownCards
