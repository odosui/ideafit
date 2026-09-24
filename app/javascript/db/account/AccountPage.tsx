import * as React from 'react'
import api from '../api'
import { useCurrentUser } from './CurrentUserContext'
import { AccountChanges, changesFrom } from './accountChanges'
import EmailUpdatesField from './EmailUpdatesField'
import NewItemEmailsField from './NewItemEmailsField'

type Status = 'idle' | 'saving' | 'saved' | 'error'

const AccountPage: React.FC = () => {
  const { user, setUser } = useCurrentUser()
  const [changes, setChanges] = React.useState(changesFrom(user))
  const [status, setStatus] = React.useState<Status>('idle')

  const change = (fields: Partial<AccountChanges>) => {
    setChanges((prev) => ({ ...prev, ...fields }))
    setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    try {
      const saved = await api.account.update(changes)
      if (!saved?.email) throw new Error('not saved')
      setUser(saved)
      setChanges(changesFrom(saved))
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="settings-form__heading">
        <h2>Settings</h2>
      </div>

      <label className="field">
        Name
        <input
          className="input"
          type="text"
          value={changes.name}
          maxLength={50}
          placeholder="How others see you"
          onChange={(e) => change({ name: e.target.value })}
        />
      </label>

      <label className="field">
        Email
        <input
          className="input"
          type="email"
          value={user?.email ?? ''}
          disabled
        />
      </label>

      <EmailUpdatesField
        checked={changes.email_updates}
        onChange={(checked) => change({ email_updates: checked })}
      />

      {user?.admin && (
        <NewItemEmailsField
          value={changes.new_item_emails}
          disabled={!changes.email_updates}
          onChange={(value) => change({ new_item_emails: value })}
        />
      )}

      <div className="settings-form__actions">
        <button
          className="btn btn--primary"
          type="submit"
          disabled={status === 'saving'}
        >
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {status === 'saved' && <span>Saved</span>}
        {status === 'error' && (
          <span className="field__error">
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  )
}

export default AccountPage
