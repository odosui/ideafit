import { ItemKind } from '../../../../../shared/items/itemKind'

interface KindOption {
  value: ItemKind
  label: string
}

export const ITEM_KINDS: KindOption[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'bug', label: 'Bug' },
  { value: 'question', label: 'Question' },
]

export const labelOfKind = (kind: ItemKind) =>
  ITEM_KINDS.find((option) => option.value === kind)?.label ?? kind
