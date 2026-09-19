import { useEffect, useState } from 'react'
import { ItemKind } from '../types'
import {
  kindFromLocation,
  pushKindToLocation,
  showKindInLocation,
} from './boardLocation'

export default function useBoardKind(): [ItemKind, (kind: ItemKind) => void] {
  const [kind, setKind] = useState(kindFromLocation)

  useEffect(() => {
    showKindInLocation(kindFromLocation())
    const update = () => setKind(kindFromLocation())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  const selectKind = (next: ItemKind) => {
    if (next === kind) return
    pushKindToLocation(next)
    setKind(next)
  }

  return [kind, selectKind]
}
