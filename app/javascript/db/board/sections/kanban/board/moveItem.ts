import { ItemStatus } from '../../../../../shared/items/itemStatus'
import { BoardItem } from '../../../../types'
import { changeStatus } from '../../items/status/changeStatus'

// Moves the card right away and puts it back if saving fails.
export const moveItem = async (
  item: BoardItem,
  status: ItemStatus,
  onChanged: (item: BoardItem) => void,
) => {
  if (item.status === status) return

  onChanged({ ...item, status })
  onChanged((await changeStatus(item, status)) ?? item)
}
