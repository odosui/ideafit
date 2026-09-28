import { BoardView } from './boardView'

const PATHS_BY_VIEW: Record<BoardView, string> = {
  idea: '/ideas',
  bug: '/bugs',
  question: '/questions',
  roadmap: '/roadmap',
}

export const pathForView = (view: BoardView) => PATHS_BY_VIEW[view]

export const viewFromPath = (path: string): BoardView | null =>
  (Object.keys(PATHS_BY_VIEW) as BoardView[]).find(
    (view) => PATHS_BY_VIEW[view] === path,
  ) ?? null
