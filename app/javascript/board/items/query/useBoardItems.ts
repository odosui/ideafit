import * as React from 'react'
import { ItemKind } from '../../../shared/items/itemKind'
import api from '../../api'
import { Item } from '../../types'
import { ItemFilter } from './itemFilter'

export const useBoardItems = (
  pid: string,
  kind: ItemKind,
  filter: ItemFilter,
) => {
  const [items, setItems] = React.useState<Item[] | null>(null)
  const [version, setVersion] = React.useState(0)

  React.useEffect(() => {
    let current = true
    setItems(null)
    api.items.list(pid, kind, filter).then((data) => {
      if (current) setItems(data || [])
    })
    return () => {
      current = false
    }
  }, [pid, kind, filter, version])

  const reload = () => setVersion((v) => v + 1)

  const replaceItem = (changed: Item) =>
    setItems(
      (prev) =>
        prev?.map((item) => (item.id === changed.id ? changed : item)) ?? prev,
    )

  return { items, reload, replaceItem }
}
