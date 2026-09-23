import { ItemKind } from '../../shared/items/itemKind'

interface KindLabels {
  addButton: string
  empty: string
  added: string
  edited: string
  deleted: string
  confirmDelete: string
}

const labelsFor = (
  noun: string,
  article: string,
  emoji: string,
): KindLabels => ({
  addButton: `Add ${noun}`,
  empty: `Be the first to add ${article} ${noun.toLowerCase()}! ${emoji}`,
  added: `${noun} added! 🍕`,
  edited: `${noun} updated! 🍕`,
  deleted: `${noun} successfully deleted! 🍕`,
  confirmDelete: `Are you sure want to delete this ${noun.toLowerCase()}?`,
})

const LABELS_BY_KIND: Record<ItemKind, KindLabels> = {
  idea: labelsFor('Idea', 'an', '💡'),
  bug: labelsFor('Bug', 'a', '🐞'),
  question: labelsFor('Question', 'a', '❓'),
}

export const labelsForKind = (kind: ItemKind) => LABELS_BY_KIND[kind]
