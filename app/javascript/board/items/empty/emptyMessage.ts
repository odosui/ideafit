import { ItemKind } from '../../../shared/items/itemKind'
import { labelsForKind } from '../kindLabels'
import { ItemFilter } from '../query/itemFilter'

export const emptyMessage = (kind: ItemKind, filter: ItemFilter) => {
  const labels = labelsForKind(kind)
  if (filter === 'done') return `No ${labels.plural} are done yet.`
  if (filter === 'rejected') return `No rejected ${labels.plural}.`
  return labels.empty
}
