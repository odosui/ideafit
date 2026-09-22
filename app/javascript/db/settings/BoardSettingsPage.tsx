import * as React from 'react'
import { DEFAULT_BOARD_DESCRIPTION } from '../../shared/boardDescription'
import api from '../api'
import { Board, BoardChanges } from '../types'
import ColorSchemePicker from './ColorSchemePicker'
import DeleteBoardSection from './DeleteBoardSection'

interface Props {
  board: Board
}

const changesFrom = (board: Board): BoardChanges => ({
  name: board.name,
  description: board.description ?? '',
  color_scheme: board.color_scheme,
})

const BoardSettingsPage: React.FC<Props> = ({ board }) => {
  const [changes, setChanges] = React.useState(changesFrom(board))
  const [status, setStatus] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const change = (fields: Partial<BoardChanges>) => {
    setChanges((prev) => ({ ...prev, ...fields }))
    setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    try {
      const saved = await api.boards.update(board.pid, changes)
      if (!saved?.pid) throw new Error('not saved')
      setChanges(changesFrom(saved))
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2>Board settings</h2>

      <label className="field">
        Name
        <input
          className="input"
          type="text"
          value={changes.name}
          onChange={(e) => change({ name: e.target.value })}
          required
        />
      </label>

      <label className="field">
        Description
        <textarea
          className="textarea"
          value={changes.description}
          placeholder={DEFAULT_BOARD_DESCRIPTION}
          onChange={(e) => change({ description: e.target.value })}
        />
      </label>

      <div className="field">
        Color scheme
        <ColorSchemePicker
          value={changes.color_scheme}
          onChange={(color_scheme) => change({ color_scheme })}
        />
      </div>

      <div className="settings-form__actions">
        <button className="btn btn--primary" type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {status === 'saved' && <span>Saved</span>}
        {status === 'error' && (
          <span className="field__error">Something went wrong. Please try again.</span>
        )}
      </div>

      <DeleteBoardSection board={board} />
    </form>
  )
}

export default BoardSettingsPage
