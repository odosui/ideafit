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
    <form className="board-settings" onSubmit={handleSubmit}>
      <div className="board-settings__heading">
        <h2>Settings</h2>
      </div>

      <label className="board-settings__field">
        Name
        <input
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

      <label className="board-settings__field">
        Email
        <input type="email" value={user?.email ?? ''} disabled />
      </label>

      <div className="board-settings__actions">
        <button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {status === 'saved' && <span>Saved</span>}
        {status === 'error' && (
          <span className="board-settings__error">
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  )
}

export default AccountPage
