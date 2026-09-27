import { ApiAuth } from '../../shared/apiAuth'
import csrfToken from '../../shared/csrfToken'
import { embedSession } from './embedSession'

// Inside an iframe the session cookie rarely arrives, so we never send the visitor off to sign in.
export const embedApiAuth = (pid: string): ApiAuth => ({
  headers: (): Record<string, string> => {
    const session = embedSession.current()
    return session
      ? { Authorization: `Bearer ${session.token}` }
      : { 'X-CSRF-Token': csrfToken() }
  },
  renew: async () => {
    const session = embedSession.current()
    return session ? embedSession.start(pid, session.jwt) : false
  },
  onUnauthorized: () => embedSession.clear(),
})
