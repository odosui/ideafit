import { railsRunner } from './rails'

export function addFollower(pid: string, itemTitle: string): string {
  const output = railsRunner('e2e/support/add_follower.rb', pid, itemTitle)
  return JSON.parse(output).email
}
