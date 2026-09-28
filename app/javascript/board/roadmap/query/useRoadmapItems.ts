import * as React from 'react'
import api from '../../api'
import { useCurrentUser } from '../../currentUser/useCurrentUser'
import { Item } from '../../types'

// Reloads when someone signs in, since each viewer sees their own votes.
export const useRoadmapItems = (pid: string) => {
  const [items, setItems] = React.useState<Item[] | null>(null)
  const viewer = useCurrentUser()

  React.useEffect(() => {
    let current = true
    api.roadmap.list(pid).then((data) => {
      if (current) setItems(data || [])
    })
    return () => {
      current = false
    }
  }, [pid, viewer])

  const replaceItem = (changed: Item) =>
    setItems(
      (prev) =>
        prev && prev.map((item) => (item.id === changed.id ? changed : item)),
    )

  return { items, replaceItem }
}
