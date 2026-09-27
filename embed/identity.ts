// Hands the host site's signed user token to the board's iframe once it says it's ready.
// Kept in sync with app/javascript/board/embedIdentity/hostMessages.ts
const READY = 'ideafit:ready'
const IDENTIFY = 'ideafit:identify'

export function sendIdentity(
  frame: HTMLIFrameElement | null,
  host: string,
  token: string | null,
) {
  frame?.contentWindow?.postMessage(
    { type: IDENTIFY, token },
    new URL(host).origin,
  )
}

export function onFrameReady(
  frame: () => HTMLIFrameElement | null,
  callback: () => void,
) {
  window.addEventListener('message', (event) => {
    const current = frame()
    if (
      current &&
      event.source === current.contentWindow &&
      event.data?.type === READY
    ) {
      callback()
    }
  })
}
