import csrfToken from './csrfToken'
import { signInPath } from './authPaths'

// How API calls prove who's calling. By default the session cookie does, and a 401
// sends the visitor to sign in. Embedded boards swap in a Bearer token instead.
export interface ApiAuth {
  headers: () => Record<string, string>
  renew: () => Promise<boolean>
  onUnauthorized: () => void
}

const sessionAuth: ApiAuth = {
  headers: () => ({ 'X-CSRF-Token': csrfToken() }),
  renew: async () => false,
  onUnauthorized: () => {
    window.location.href = signInPath()
  },
}

let currentAuth = sessionAuth

export const apiAuth = () => currentAuth

export const setApiAuth = (auth: ApiAuth) => {
  currentAuth = auth
}
