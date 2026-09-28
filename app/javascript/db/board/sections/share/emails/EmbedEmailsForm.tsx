import * as React from 'react'
import api from '../../../../api'
import { EmbedEmails } from './embedEmails'

interface Props {
  pid: string
  settings: EmbedEmails
}

type SaveStatus =
  { state: 'idle' | 'saving' | 'saved' } | { state: 'error'; message: string }

const FALLBACK_ERROR = 'Something went wrong. Please try again.'

const EmbedEmailsForm: React.FC<Props> = ({ pid, settings }) => {
  const [trustEmails, setTrustEmails] = React.useState(settings.trust_emails)
  const [pageUrl, setPageUrl] = React.useState(settings.page_url ?? '')
  const [status, setStatus] = React.useState<SaveStatus>({ state: 'idle' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ state: 'saving' })
    const saved = await api.embedEmails
      .update(pid, { trust_emails: trustEmails, page_url: pageUrl })
      .catch(() => null)
    if (saved && 'trust_emails' in saved) {
      setPageUrl(saved.page_url ?? '')
      setStatus({ state: 'saved' })
    } else {
      setStatus({
        state: 'error',
        message: saved?.errors?.[0] ?? FALLBACK_ERROR,
      })
    }
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <label className="field field--check">
        <input
          type="checkbox"
          checked={trustEmails}
          onChange={(e) => setTrustEmails(e.target.checked)}
        />
        <span>
          Email status updates to the address in the token
          <span className="field__hint">
            Applies to every board in this workspace
          </span>
        </span>
      </label>

      <label className="field">
        Page on your site with this board
        <input
          className="input"
          type="url"
          value={pageUrl}
          placeholder="https://example.com/feedback"
          onChange={(e) => setPageUrl(e.target.value)}
        />
        <span className="field__hint">
          Emails to your users link here, where they're already signed in. Leave
          empty to link to the board on Ideafit.
        </span>
      </label>

      <div className="settings-form__actions">
        <button
          className="btn btn--primary"
          type="submit"
          disabled={status.state === 'saving'}
        >
          {status.state === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {status.state === 'saved' && <span>Saved</span>}
        {status.state === 'error' && (
          <span className="field__error">{status.message}</span>
        )}
      </div>
    </form>
  )
}

export default EmbedEmailsForm
