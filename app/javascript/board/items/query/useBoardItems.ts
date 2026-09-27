import * as React from 'react'
import { ItemKind } from '../../../shared/items/itemKind'
import api from '../../api'
import { useCurrentUser } from '../../currentUser/useCurrentUser'
import { Item } from '../../types'
import { ItemFilter } from './itemFilter'

interface Loaded {
  listKey: string
  items: Item[]
}

// Keeps showing the current items until fresh ones arrive, both on reload
// and when switching kind or filter. `itemsKey` names the list being shown.
// Reloads when someone signs in, since each viewer sees their own votes.
export const useBoardItems = (
  pid: string,
  kind: ItemKind,
  filter: ItemFilter,
) => {
  const [loaded, setLoaded] = React.useState<Loaded | null>(null)
  const [version, setVersion] = React.useState(0)
  const viewer = useCurrentUser()
  const listKey = [pid, kind, filter].join('/')

  React.useEffect(() => {
    let current = true
    api.items.list(pid, kind, filter).then((data) => {
      if (current) setLoaded({ listKey, items: data || [] })
    })
    return () => {
      current = false
    }
  }, [pid, kind, filter, listKey, version, viewer])

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

  return {
    items: loaded?.items ?? null,
    itemsKey: loaded?.listKey,
    loading: loaded?.listKey !== listKey,
    reload,
    replaceItem,
  }
}
