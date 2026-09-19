import csrfToken from './csrfToken'
import { signInPath } from './authPaths'

export async function api(
  method: string,
  url: string,
  data?: { [k: string]: string },
) {
  const attrs: any = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }

  if (data) {
    if (method === 'get') {
      url = `${url}?${toQuery(data)}`
    } else {
      attrs.body = JSON.stringify(data)
    }
  }

  attrs.headers['X-CSRF-Token'] = csrfToken()

  const x = await fetch(`/api${url}`, attrs)
  if (x.status === 401) {
    window.location.href = signInPath()
    return
  }
  return await x.json()
}

function toQuery(data: { [k: string]: string }) {
  const esc = window.encodeURIComponent
  return Object.keys(data)
    .map((k) => esc(k) + '=' + esc(data[k]))
    .join('&')
}
