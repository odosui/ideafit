import showToast from '../../../../../shared/toaster'
import api from '../../../../api'
import { emailsCount } from '../outboxCounts'

export const deliverOutbox = async (pid: string, fingerprint: string) => {
  const result = await api.outbox.deliver(pid, fingerprint).catch(() => null)
  if (!result?.success) {
    showToast(result?.error ?? "Couldn't send. Please try again.", 'error')
  } else if (result.emails === 0) {
    showToast('Outbox cleared')
  } else {
    showToast(`Sent ${emailsCount(result.emails)}`)
  }
}
