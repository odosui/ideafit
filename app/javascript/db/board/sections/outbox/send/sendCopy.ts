import { changesCount, emailsCount, peopleCount } from '../outboxCounts'
import { Outbox } from '../query/outbox'

export interface SendCopy {
  start: string
  question: string
  warning: string
  finish: string
}

export const sendCopy = (outbox: Outbox): SendCopy => {
  const changes = changesCount(outbox.changes.length)
  if (outbox.emails === 0) {
    return {
      start: 'Clear outbox',
      question: `Clear ${changes} without emailing anyone?`,
      warning: "Are you sure? This can't be undone.",
      finish: 'Clear now',
    }
  }
  return {
    start: `Send ${emailsCount(outbox.emails)}`,
    question: `Email ${peopleCount(outbox.emails)} about ${changes}?`,
    warning: "Are you sure? Emails go out right away and can't be recalled.",
    finish: 'Send now',
  }
}
