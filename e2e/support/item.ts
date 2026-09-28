import { railsRunner } from './rails'

export function addItem(
  pid: string,
  kind: string,
  title: string,
  status: string,
) {
  railsRunner('e2e/support/add_item.rb', pid, kind, title, status)
}
