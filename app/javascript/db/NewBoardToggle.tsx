import * as React from 'react'
import NewBoardForm from './NewBoardForm'
import { Board } from './types'

interface Props {
  onCreated: (board: Board) => void
}

const NewBoardToggle: React.FC<Props> = ({ onCreated }) => {
  const [open, setOpen] = React.useState(false)

  if (!open) {
    return (
      <button
        className="db-new-board-toggle btn btn--primary"
        type="button"
        onClick={() => setOpen(true)}
      >
        <i className="fas fa-plus" aria-hidden="true" />
        New board
      </button>
    )
  }

  return (
    <NewBoardForm
      autoFocus
      onCancel={() => setOpen(false)}
      onCreated={(board) => {
        onCreated(board)
        setOpen(false)
      }}
    />
  )
}

export default NewBoardToggle
