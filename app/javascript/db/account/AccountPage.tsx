import * as React from 'react'
import api from '../api'
import { useCurrentUser } from './CurrentUserContext'

type Status = 'idle' | 'saving' | 'saved' | 'error'

const AccountPage: React.FC = () => {
  const { user, setUser } = useCurrentUser()
  const [name, setName] = React.useState(user?.name ?? '')
  const [status, setStatus] = React.useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    try {
      const saved = await api.account.update(name)
      if (!saved?.email) throw new Error('not saved')
      setUser(saved)
      setName(saved.name ?? '')
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
          value={name}
          maxLength={50}
          placeholder="How others see you"
          onChange={(e) => {
            setName(e.target.value)
            setStatus('idle')
          }}
        />
      </label>

      <label className="field">
        Email
        <input className="input" type="email" value={user?.email ?? ''} disabled />
      </label>

      <div className="settings-form__actions">
        <button className="btn btn--primary" type="submit" disabled={status === 'saving'}>
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
