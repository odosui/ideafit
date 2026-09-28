import * as React from 'react'

const EmptyOutbox: React.FC = () => (
  <div className="board-coming-soon">
    <i className="fas fa-paper-plane" aria-hidden="true" />
    <h2>Nothing to send</h2>
    <p>
      When you change an item's status, followers' emails wait here until you
      send them.
    </p>
  </div>
)

export default EmptyOutbox
