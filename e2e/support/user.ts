import { railsRunner } from './rails'

export function createUser(): string {
  return railsRunner('e2e/support/create_user.rb').trim()
}
