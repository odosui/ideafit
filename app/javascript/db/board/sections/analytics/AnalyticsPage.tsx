import * as React from 'react'
import { Board } from '../../../types'
import BreakdownCards from './breakdown/BreakdownCards'
import PrivacyNote from './PrivacyNote'
import { useBoardAnalytics } from './query/useBoardAnalytics'
import TopItems from './top/TopItems'
import TotalsRow from './totals/TotalsRow'
import WeeklyActivity from './weekly/WeeklyActivity'

interface Props {
  board: Board
}

const AnalyticsPage: React.FC<Props> = ({ board }) => {
  const analytics = useBoardAnalytics(board.pid)
  if (!analytics) return <p className="items-page__note">Loading…</p>

  return (
    <section className="analytics-page">
      <TotalsRow totals={analytics.totals} />
      <WeeklyActivity weeks={analytics.weekly} />
      <BreakdownCards analytics={analytics} />
      <TopItems pid={board.pid} items={analytics.top_items} />
      <PrivacyNote />
    </section>
  )
}

export default AnalyticsPage
