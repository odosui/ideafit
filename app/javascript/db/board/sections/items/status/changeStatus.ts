import showToast from '../../../../../shared/toaster'
import { ItemStatus } from '../../../../../shared/items/itemStatus'
import api from '../../../../api'
import { BoardItem } from '../../../../types'
import { labelOfStatus } from '../options/itemStatuses'

export const changeStatus = async (
  item: BoardItem,
  status: ItemStatus,
): Promise<BoardItem | null> => {
  const saved = await api.items.setStatus(item.id, status).catch(() => null)
  if (!saved?.status) {
    showToast("Couldn't change the status. Please try again.", 'error')
    return null
  }

  showToast(`Status changed to ${labelOfStatus(saved.status)}`)
  return { ...item, status: saved.status }
}
