import * as React from 'react'
import AnalyticsCard from '../AnalyticsCard'
import { TopItem } from '../query/boardAnalytics'
import TopItemRow from './TopItemRow'

interface Props {
  pid: string
  items: TopItem[]
}

const TopItems: React.FC<Props> = ({ pid, items }) => (
  <AnalyticsCard title="Most voted items">
    {items.length === 0 ? (
      <p className="analytics-card__empty">No votes yet.</p>
    ) : (
      <ol className="top-items">
        {items.map((item) => (
          <TopItemRow key={item.id} pid={pid} item={item} />
        ))}
      </ol>
    )}
  </AnalyticsCard>
)

export default TopItems
