import { ItemKind } from '../../shared/items/itemKind'

const PATHS_BY_KIND: Record<ItemKind, string> = {
  idea: '/ideas',
  bug: '/bugs',
  question: '/questions',
}

export const pathForKind = (kind: ItemKind) => PATHS_BY_KIND[kind]

export const kindFromPath = (path: string): ItemKind | null =>
  (Object.keys(PATHS_BY_KIND) as ItemKind[]).find(
    (kind) => PATHS_BY_KIND[kind] === path,
  ) ?? null
