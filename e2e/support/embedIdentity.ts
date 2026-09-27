import { createHmac } from 'crypto'
import { railsRunner } from './rails'

export function embedSecretFor(pid: string): string {
  return railsRunner('e2e/support/embed_secret.rb', pid)
}

const base64url = (part: object) =>
  Buffer.from(JSON.stringify(part)).toString('base64url')

// Signs a user token the way a host site's server would.
export function identityJwt(secret: string, claims: Record<string, string>) {
  const exp = Math.floor(Date.now() / 1000) + 3600
  const unsigned = `${base64url({ alg: 'HS256', typ: 'JWT' })}.${base64url({ ...claims, exp })}`
  const signature = createHmac('sha256', secret)
    .update(unsigned)
    .digest('base64url')
  return `${unsigned}.${signature}`
}
