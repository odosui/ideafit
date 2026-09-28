import { ItemKind } from '../../shared/items/itemKind'

export type BoardView = ItemKind | 'roadmap'

export const isKindView = (view: BoardView): view is ItemKind =>
  view !== 'roadmap'
