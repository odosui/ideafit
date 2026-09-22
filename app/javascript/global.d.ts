interface Window {
  user: import('./shared/currentUser').CurrentUser | null
  board?: import('./db/types').Board
  item?: import('./db/types').BoardItem
  participantBoards?: import('./db/types').Board[]
}
