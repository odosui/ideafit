import { ItemKind } from '../types'

interface KindLabels {
  addButton: string
  empty: string
  added: string
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
  deleted: `${noun} successfully deleted! 🍕`,
  confirmDelete: `Are you sure want to delete this ${noun.toLowerCase()}?`,
})

const LABELS_BY_KIND: Record<ItemKind, KindLabels> = {
  idea: labelsFor('Idea', 'an', '💡'),
  bug: labelsFor('Bug', 'a', '🐞'),
  question: labelsFor('Question', 'a', '❓'),
}

export const labelsForKind = (kind: ItemKind) => LABELS_BY_KIND[kind]
