import { CurrentUser } from '../../shared/currentUser'

interface Exchanged {
  token: string
  user: CurrentUser
}

// Trades the host site's JWT for an Ideafit token.
export async function exchangeIdentity(
  pid: string,
  jwt: string,
): Promise<Exchanged | null> {
  const response = await fetch('/api/embed/sessions', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ board_pid: pid, token: jwt }),
  })
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    console.warn(`Ideafit couldn't sign the user in. ${body?.error ?? ''}`)
    return null
  }
  return { token: body.token, user: body.user }
}
