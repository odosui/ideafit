import * as React from 'react'
import api from '../../api'
import { Board } from '../../types'

export const useBoardList = () => {
  const [boards, setBoards] = React.useState<Board[] | null>(null)

  React.useEffect(() => {
    api.boards.list().then((data) => setBoards(data || []))
  }, [])

  return boards
}
