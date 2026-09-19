import * as React from 'react'
import { DEFAULT_BOARD_DESCRIPTION } from '../shared/boardDescription'
import api from './api'
import { Board } from './types'

interface Props {
  onCreated: (board: Board) => void
  autoFocus?: boolean
  onCancel?: () => void
}

const NewBoardForm: React.FC<Props> = ({ onCreated, autoFocus, onCancel }) => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed || submitting) return

    setSubmitting(true)
    setError(null)
    try {
      const board = await api.boards.create(trimmed, description)
      if (board) {
        setName('')
        setDescription('')
        onCreated(board)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="db-new-board" onSubmit={handleSubmit}>
      <input
        className="db-new-board__input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New board name"
        autoFocus={autoFocus}
        disabled={submitting}
      />
      <textarea
        className="db-new-board__description"
        aria-label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={DEFAULT_BOARD_DESCRIPTION}
        disabled={submitting}
      />
      {onCancel && (
        <button
          className="db-new-board__cancel"
          type="button"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      )}
      <button
        className="db-new-board__submit"
        type="submit"
        disabled={submitting || !name.trim()}
      >
        {submitting ? 'Creating…' : 'Create'}
      </button>
      {error && <p className="db-new-board__error">{error}</p>}
    </form>
  )
}

export default NewBoardForm
