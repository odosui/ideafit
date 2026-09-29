import * as React from 'react'
import api from '../../api'
import { BoardCounts } from './boardCounts'
import { onBoardCountsStale } from './boardCountsStale'

export const useBoardCounts = (pid: string) => {
  const [counts, setCounts] = React.useState<BoardCounts | null>(null)

  React.useEffect(() => {
    let current = true
    const load = () =>
      api.counts.show(pid).then((data) => {
        if (current && data && 'outbox' in data) setCounts(data)
      })
    load()
    const unsubscribe = onBoardCountsStale(load)
    return () => {
      current = false
      unsubscribe()
    }
  }, [pid])

  return counts
}
