import * as React from 'react'
import api from '../api'
import { Board } from '../types'

interface Props {
  board: Board
}

const DeleteBoardSection: React.FC<Props> = ({ board }) => {
  const [deleting, setDeleting] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${board.name}"? All its items and votes will be gone for good.`,
    )
    if (!confirmed) return

    setDeleting(true)
    setFailed(false)
    const result = await api.boards.remove(board.pid).catch(() => null)
    if (result?.success) {
      window.location.href = '/'
    } else {
      setDeleting(false)
      setFailed(true)
    }
  }

  return (
    <section className="settings-form__danger">
      <div>
        <h3>Delete board</h3>
        <p>
          Removes the board with all its items and votes. This can't be undone.
        </p>
        {failed && (
          <p className="field__error">
            Couldn't delete the board. Please try again.
          </p>
        )}
      </div>
      <button
        className="btn btn--danger"
        type="button"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? 'Deleting…' : 'Delete board'}
      </button>
    </section>
  )
}

export default DeleteBoardSection
