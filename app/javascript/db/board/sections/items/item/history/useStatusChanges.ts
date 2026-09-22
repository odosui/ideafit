import * as React from 'react'
import api from '../../../../../api'
import { BoardItem, StatusChange } from '../../../../../types'

export const useStatusChanges = (item: BoardItem) => {
  const [changes, setChanges] = React.useState<StatusChange[] | null>(null)

  React.useEffect(() => {
    let current = true
    api.items.statusChanges(item.id).then((data) => {
      if (current) setChanges(data || [])
    })
    return () => {
      current = false
    }
  }, [item.id, item.status])

  return changes
}
