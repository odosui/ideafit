import { createHmac } from 'crypto'
import { railsRunner } from './rails'

export function embedSecretFor(pid: string): string {
  return railsRunner('e2e/support/embed_secret.rb', pid)
}

// Signs a user token the way a host site's server would.
export function identityJwt(secret: string, claims: Record<string, string>) {
  const exp = Math.floor(Date.now() / 1000) + 3600
  const encode = (part: object) =>
    Buffer.from(JSON.stringify(part)).toString('base64url')
  const unsigned = `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode({ ...claims, exp })}`
  const signature = createHmac('sha256', secret)
    .update(unsigned)
    .digest('base64url')
  return `${unsigned}.${signature}`
}
