import { BoardSectionKey, DEFAULT_BOARD_SECTION } from './boardSections'

export const boardSectionPath = (pid: string, section: BoardSectionKey) => {
  const base = `/db/boards/${pid}`
  return section === DEFAULT_BOARD_SECTION ? base : `${base}/${section}`
}
