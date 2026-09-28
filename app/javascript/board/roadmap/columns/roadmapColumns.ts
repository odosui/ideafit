import { ItemStatus } from '../../../shared/items/itemStatus'
import { Item } from '../../types'

export interface RoadmapColumnSpec {
  title: string
  statuses: ItemStatus[]
}

// Items ready to ship are still on their way, so they stay in progress
export const ROADMAP_COLUMNS: RoadmapColumnSpec[] = [
  { title: 'Planned', statuses: ['planned'] },
  { title: 'In progress', statuses: ['in_progress', 'ready'] },
  { title: 'Done', statuses: ['done'] },
]

export const itemsInColumn = (items: Item[], column: RoadmapColumnSpec) =>
  items.filter((item) => column.statuses.includes(item.status))
