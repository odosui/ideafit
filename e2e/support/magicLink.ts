import { Page } from '@playwright/test'
import { railsRunner } from './rails'

export function magicLinkFor(email: string, returnTo = '/'): string {
  const token = railsRunner('e2e/support/magic_link_token.rb', email)
  return `/sign_in/${token}?return_to=${encodeURIComponent(returnTo)}`
}

export async function signIn(page: Page, email: string) {
  await page.goto(magicLinkFor(email))
}
