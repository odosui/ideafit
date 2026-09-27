import * as React from 'react'
import { Board } from '../../types'
import ImportButton from './ImportButton'

interface Props {
  board: Board
}

const TransferSection: React.FC<Props> = ({ board }) => (
  <section className="settings-panel">
    <div>
      <h3>Import and export</h3>
      <p>
        Move items, votes and the people behind them in and out as Ideafit JSON.
        Importing again updates items that have an id instead of duplicating
        them. People you import are signed in as themselves once your site signs
        tokens with the same user ids.
      </p>
    </div>
    <div className="settings-panel__actions">
      <a className="btn" href={`/api/boards/${board.pid}/export`} download>
        <i className="fas fa-file-download" aria-hidden="true" />
        Export JSON
      </a>
      <ImportButton pid={board.pid} />
    </div>
  </section>
)

export default TransferSection
