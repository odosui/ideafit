import * as React from 'react'
import { useCurrentUser } from '../currentUser/useCurrentUser'
import { useAnswerEmailConsent } from './useAnswerEmailConsent'

// Lets a host site's user change their answer to the email question.
const EmailUpdatesSwitch: React.FC = () => {
  const user = useCurrentUser()
  const { answer, answering, saving } = useAnswerEmailConsent()
  if (user?.embed_email_consent !== 'answered') return null

  return (
    <label className="email-updates-switch">
      <input
        type="checkbox"
        checked={answering ?? user.email_updates}
        disabled={saving}
        onChange={(e) => answer(e.target.checked)}
      />
      <span>
        Email updates
        <span className="email-updates-switch__address">{user.email}</span>
      </span>
    </label>
  )
}

export default EmailUpdatesSwitch
