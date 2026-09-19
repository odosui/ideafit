import * as React from 'react'
import { DEFAULT_BOARD_DESCRIPTION } from '../../shared/boardDescription'
import api from '../api'
import { Board, BoardChanges } from '../types'
import CopyLinkButton from '../links/CopyLinkButton'
import { publicBoardUrl } from '../links/publicBoardUrl'
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
    <form className="board-settings" onSubmit={handleSubmit}>
      <a className="board-settings__back" href="/">
        <i className="fas fa-arrow-left" aria-hidden="true" />
        All boards
      </a>

      <div className="board-settings__heading">
        <h2>Board settings</h2>
        <div className="board-settings__links">
          <CopyLinkButton
            url={publicBoardUrl(board.pid)}
            className="board-settings__open"
            showLabel
          />
          <a
            className="board-settings__open"
            href={`/b/${board.pid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open board
            <i className="fas fa-external-link-alt" aria-hidden="true" />
          </a>
        </div>
      </div>

      <label className="board-settings__field">
        Name
        <input
          type="text"
          value={changes.name}
          onChange={(e) => change({ name: e.target.value })}
          required
        />
      </label>

      <label className="board-settings__field">
        Description
        <textarea
          value={changes.description}
          placeholder={DEFAULT_BOARD_DESCRIPTION}
          onChange={(e) => change({ description: e.target.value })}
        />
      </label>

      <div className="board-settings__field">
        Color scheme
        <ColorSchemePicker
          value={changes.color_scheme}
          onChange={(color_scheme) => change({ color_scheme })}
        />
      </div>

      <div className="board-settings__actions">
        <button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {status === 'saved' && <span>Saved</span>}
        {status === 'error' && (
          <span className="board-settings__error">Something went wrong. Please try again.</span>
        )}
      </div>

      <DeleteBoardSection board={board} />
    </form>
  )
}

export default BoardSettingsPage
