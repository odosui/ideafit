interface Window {
  user: import('./shared/currentUser').CurrentUser | null
  board?: import('./db/types').Board
  participantBoards?: import('./db/types').Board[]
}
