import * as React from 'react'
import { useDebouncedValue } from '../../../../../shared/hooks/useDebouncedValue'
import api from '../../../../api'
import { BoardItem } from '../../../../types'
import { ItemQuery } from './itemQuery'

const SEARCH_DELAY_MS = 300

export const useBoardItems = (pid: string, query: ItemQuery) => {
  const [items, setItems] = React.useState<BoardItem[] | null>(null)
  const q = useDebouncedValue(query.q, SEARCH_DELAY_MS)
  const { kind, status, sort } = query

  React.useEffect(() => {
    let current = true
    api.items.list(pid, { kind, status, sort, q }).then((data) => {
      if (current) setItems(data || [])
    })
    return () => {
      current = false
    }
  }, [pid, kind, status, sort, q])

  const replaceItem = (changed: BoardItem) =>
    setItems((prev) =>
      prev?.map((item) => (item.id === changed.id ? changed : item)) ?? prev,
    )

  return { items, replaceItem }
}
