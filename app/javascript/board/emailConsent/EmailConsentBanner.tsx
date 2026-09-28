import * as React from 'react'
import Button from '../../shared/Button'
import { useCurrentUser } from '../currentUser/useCurrentUser'
import { useAnswerEmailConsent } from './useAnswerEmailConsent'

const EmailConsentBanner: React.FC = () => {
  const user = useCurrentUser()
  const { answer, saving } = useAnswerEmailConsent()
  if (user?.embed_email_consent !== 'pending') return null

  return (
    <section className="email-consent" aria-label="Email updates">
      <div>
        <h2 className="email-consent__title">Get email updates?</h2>
        <p className="email-consent__text">
          We'll email <strong>{user.email}</strong> when something you post,
          vote for or follow changes status. You can stop anytime.
        </p>
      </div>
      <div className="email-consent__actions">
        <Button
          className="btn--primary"
          loading={saving}
          onClick={() => answer(true)}
        >
          Yes, email me
        </Button>
        <Button disabled={saving} onClick={() => answer(false)}>
          No thanks
        </Button>
      </div>
    </section>
  )
}

export default EmailConsentBanner
