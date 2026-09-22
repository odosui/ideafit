import * as React from 'react'
import { ItemKind } from '../../../shared/items/itemKind'
import api from '../../api'
import { Item } from '../../types'
import { ItemFilter } from './itemFilter'

interface Loaded {
  queryKey: string
  items: Item[]
}

export const useBoardItems = (
  pid: string,
  kind: ItemKind,
  filter: ItemFilter,
) => {
  const [loaded, setLoaded] = React.useState<Loaded | null>(null)
  const [version, setVersion] = React.useState(0)
  const queryKey = [pid, kind, filter, version].join('/')

  React.useEffect(() => {
    let current = true
    api.items.list(pid, kind, filter).then((data) => {
      if (current) setLoaded({ queryKey, items: data || [] })
    })
    return () => {
      current = false
    }
  }, [pid, kind, filter, queryKey])

  const reload = () => setVersion((v) => v + 1)

  const replaceItem = (changed: Item) =>
    setLoaded(
      (prev) =>
        prev && {
          ...prev,
          items: prev.items.map((item) =>
            item.id === changed.id ? changed : item,
          ),
        },
    )

  const items = loaded?.queryKey === queryKey ? loaded.items : null

  return { items, reload, replaceItem }
}
