import { ItemKind } from '../../shared/items/itemKind'
import { kindFromPath, pathForKind } from './kindPaths'

const BOARD_ROOT = /^\/b\/[^/]+/

const boardRoot = () => window.location.pathname.match(BOARD_ROOT)?.[0] ?? ''
const pathInBoard = () => window.location.pathname.replace(BOARD_ROOT, '')
// Old links looked like /b/<pid>#/ideas
const legacyHashPath = () => window.location.hash.replace(/^#/, '')

export const boardPathForKind = (kind: ItemKind) =>
  boardRoot() + pathForKind(kind)

export const kindFromLocation = (): ItemKind =>
  kindFromPath(pathInBoard()) ?? kindFromPath(legacyHashPath()) ?? 'idea'

export const showKindInLocation = (kind: ItemKind) => {
  const path = boardPathForKind(kind)
  if (window.location.pathname === path && !window.location.hash) return

  window.history.replaceState(null, '', path + window.location.search)
}

export const pushKindToLocation = (kind: ItemKind) => {
  window.history.pushState(
    null,
    '',
    boardPathForKind(kind) + window.location.search,
  )
}
