interface Window {
  user: { email: string } | null
  board?: import('./db/types').Board
}
