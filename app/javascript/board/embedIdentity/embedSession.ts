import { CurrentUser } from '../../shared/currentUser'
import { exchangeIdentity } from './exchangeIdentity'

// Who the host site says is using the embedded board. We keep its JWT to get
// a fresh Ideafit token when the short-lived one expires.
interface EmbedSession {
  jwt: string
  token: string
  user: CurrentUser
}

let session: EmbedSession | null = null
const listeners = new Set<() => void>()

const change = (next: EmbedSession | null) => {
  session = next
  listeners.forEach((listener) => listener())
}

export const embedSession = {
  current: () => session,

  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  start: async (pid: string, jwt: string) => {
    const exchanged = await exchangeIdentity(pid, jwt)
    change(exchanged && { jwt, ...exchanged })
    return exchanged !== null
  },

  clear: () => change(null),
}
