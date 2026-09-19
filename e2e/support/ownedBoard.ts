import { railsRunner } from './rails'

export interface OwnedBoard {
  email: string
  pid: string
}

export function createOwnedBoard(): OwnedBoard {
  return JSON.parse(railsRunner('e2e/support/create_owned_board.rb'))
}
