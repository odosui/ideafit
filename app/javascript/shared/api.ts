import { apiAuth } from './apiAuth'

type Params = { [k: string]: string | boolean }

export async function api(method: string, url: string, data?: Params) {
  let response = await request(method, url, data)

  if (response.status === 401 && (await apiAuth().renew())) {
    response = await request(method, url, data)
  }
  if (response.status === 401) {
    apiAuth().onUnauthorized()
    return
  }
  return await response.json()
}

function request(method: string, url: string, data?: Params) {
  const isGet = method === 'get'
  const query = isGet && data ? `?${toQuery(data)}` : ''

  return fetch(`/api${url}${query}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...apiAuth().headers(),
    },
    credentials: 'include',
    body: !isGet && data ? JSON.stringify(data) : undefined,
  })
}

function toQuery(data: Params) {
  const esc = window.encodeURIComponent
  return Object.keys(data)
    .map((k) => esc(k) + '=' + esc(data[k]))
    .join('&')
}
