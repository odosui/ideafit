import { useEffect, useState } from 'react'
import {
  pushViewToLocation,
  showViewInLocation,
  viewFromLocation,
} from './boardLocation'
import { BoardView } from './boardView'

export default function useBoardView(): [BoardView, (view: BoardView) => void] {
  const [view, setView] = useState(viewFromLocation)

  useEffect(() => {
    showViewInLocation(viewFromLocation())
    const update = () => setView(viewFromLocation())
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  const selectView = (next: BoardView) => {
    if (next === view) return
    pushViewToLocation(next)
    setView(next)
  }

  return [view, selectView]
}
