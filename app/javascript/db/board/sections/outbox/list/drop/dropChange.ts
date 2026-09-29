import showToast from '../../../../../../shared/toaster'
import api from '../../../../../api'
import { OutboxChange } from '../../query/outbox'
import { markBoardCountsStale } from '../../../../counts/boardCountsStale'

export const dropChange = async (pid: string, change: OutboxChange) => {
  const result = await api.outbox
    .drop(pid, change.item_id, change.status)
    .catch(() => null)
  if (result?.success) {
    showToast(`“${change.title}” won't be sent`)
    markBoardCountsStale()
  } else {
    showToast(
      result?.error ?? "Couldn't drop the change. Please try again.",
      'error',
    )
  }
}
