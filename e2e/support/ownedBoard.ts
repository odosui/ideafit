import { railsRunner } from './rails'

export interface OwnedBoard {
  email: string
  pid: string
}

export function createOwnedBoard(): OwnedBoard {
  return JSON.parse(railsRunner('e2e/support/create_owned_board.rb'))
}

export function addBoard(email: string, name: string): OwnedBoard {
  return JSON.parse(railsRunner('e2e/support/add_board.rb', email, name))
}
