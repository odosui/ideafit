import * as React from 'react'
import api from '../../../../../api'
import { BoardItem, HistoryEvent } from '../../../../../types'

export const useItemHistory = (item: BoardItem) => {
  const [events, setEvents] = React.useState<HistoryEvent[] | null>(null)

  React.useEffect(() => {
    let current = true
    api.items.history(item.id).then((data) => {
      if (current) setEvents(data || [])
    })
    return () => {
      current = false
    }
  }, [item.id, item.status])

  return events
}
