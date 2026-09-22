import csrfToken from './csrfToken'
import { signInPath } from './authPaths'

type Params = { [k: string]: string }

export async function api(method: string, url: string, data?: Params) {
  const isGet = method === 'get'
  const query = isGet && data ? `?${toQuery(data)}` : ''

  const response = await fetch(`/api${url}${query}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken(),
    },
    credentials: 'include',
    body: !isGet && data ? JSON.stringify(data) : undefined,
  })

  if (response.status === 401) {
    window.location.href = signInPath()
    return
  }
  return await response.json()
}

function toQuery(data: Params) {
  const esc = window.encodeURIComponent
  return Object.keys(data)
    .map((k) => esc(k) + '=' + esc(data[k]))
    .join('&')
}
