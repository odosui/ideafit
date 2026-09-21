import { railsRunner } from './rails'

export function createAdmin(): string {
  return railsRunner('e2e/support/create_admin.rb').trim()
}
