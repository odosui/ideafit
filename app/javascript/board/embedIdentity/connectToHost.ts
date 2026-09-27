import { setApiAuth } from '../../shared/apiAuth'
import { embedApiAuth } from './embedApiAuth'
import { embedSession } from './embedSession'
import { READY, isIdentifyMessage } from './hostMessages'

// Tells the host page the board is ready and signs in whoever it identifies.
// The JWT is checked by the server, so any parent page may send one.
export function connectToHost(pid: string) {
  setApiAuth(embedApiAuth(pid))

  window.addEventListener('message', (event) => {
    if (event.source !== window.parent || !isIdentifyMessage(event.data)) {
      return
    }
    if (event.data.token) {
      embedSession.start(pid, event.data.token)
    } else {
      embedSession.clear()
    }
  })

  window.parent.postMessage({ type: READY }, '*')
}
