import showToast from '../../../../../shared/toaster'
import api from '../../../../api'
import { markBoardCountsStale } from '../../../counts/boardCountsStale'
import { emailsCount } from '../outboxCounts'

export const deliverOutbox = async (pid: string, fingerprint: string) => {
  const result = await api.outbox.deliver(pid, fingerprint).catch(() => null)
  if (!result?.success) {
    showToast(result?.error ?? "Couldn't send. Please try again.", 'error')
    return
  }

  markBoardCountsStale()
  showToast(
    result.emails === 0
      ? 'Outbox cleared'
      : `Sent ${emailsCount(result.emails)}`,
  )
}
