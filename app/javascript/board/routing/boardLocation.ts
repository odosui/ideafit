import { BoardView } from './boardView'
import { pathForView, viewFromPath } from './viewPaths'

const BOARD_ROOT = /^\/b\/[^/]+/

const boardRoot = () => window.location.pathname.match(BOARD_ROOT)?.[0] ?? ''
const pathInBoard = () => window.location.pathname.replace(BOARD_ROOT, '')
// Old links looked like /b/<pid>#/ideas
const legacyHashPath = () => window.location.hash.replace(/^#/, '')

export const boardPathForView = (view: BoardView) =>
  boardRoot() + pathForView(view)

export const viewFromLocation = (): BoardView =>
  viewFromPath(pathInBoard()) ?? viewFromPath(legacyHashPath()) ?? 'idea'

export const showViewInLocation = (view: BoardView) => {
  const path = boardPathForView(view)
  if (window.location.pathname === path && !window.location.hash) return

  window.history.replaceState(null, '', path + window.location.search)
}

export const pushViewToLocation = (view: BoardView) => {
  window.history.pushState(
    null,
    '',
    boardPathForView(view) + window.location.search,
  )
}
