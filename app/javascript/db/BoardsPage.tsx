import * as React from 'react'
import api from './api'
import BoardList from './BoardList'
import { Board } from './types'
import Welcome from './Welcome'

const BoardsPage: React.FC = () => {
  const [boards, setBoards] = React.useState<Board[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const load = async () => {
      try {
        const data = await api.boards.list()
        setBoards(data || [])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleCreated = (board: Board) => {
    setBoards((prev) => [board, ...prev])
  }

  if (loading) return <p className="db-board-list__empty">Loading…</p>
  if (boards.length === 0) return <Welcome onCreated={handleCreated} />
  return <BoardList boards={boards} onCreated={handleCreated} />
}

export default BoardsPage
