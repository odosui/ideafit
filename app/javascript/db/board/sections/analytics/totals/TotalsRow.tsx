import * as React from 'react'
import { AnalyticsTotals } from '../query/boardAnalytics'
import StatTile from './StatTile'

const TotalsRow: React.FC<{ totals: AnalyticsTotals }> = ({ totals }) => (
  <div className="analytics-totals">
    <StatTile label="Items" value={totals.items} />
    <StatTile label="Votes" value={totals.votes} />
    <StatTile label="Participants" value={totals.participants} />
    <StatTile label="Shipped" value={totals.shipped} />
  </div>
)

export default TotalsRow
