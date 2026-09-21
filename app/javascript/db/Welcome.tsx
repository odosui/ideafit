import * as React from 'react'
import NewBoardForm from './NewBoardForm'
import { Board } from './types'

interface Props {
  onCreated: (board: Board) => void
}

const Welcome: React.FC<Props> = ({ onCreated }) => (
  <div className="db-welcome">
    <h2>Welcome to Ideafit 👋</h2>
    <p className="db-welcome__text">
      Boards are where your users share and vote on ideas. You don't have any
      yet — create your first one to get started.
    </p>
    <NewBoardForm onCreated={onCreated} autoFocus />
  </div>
)

export default Welcome
