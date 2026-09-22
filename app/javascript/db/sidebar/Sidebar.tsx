import * as React from 'react'
import BoardNav from './board/BoardNav'
import MainNav from './MainNav'

const Sidebar: React.FC = () => (
  <aside className="db-sidebar">
    <MainNav />
    {window.board && <BoardNav board={window.board} />}
  </aside>
)

export default Sidebar
