import * as React from 'react'
import BoardNav from './board/BoardNav'
import HomeNav from './HomeNav'
import SidebarFooter from './SidebarFooter'

const Sidebar: React.FC = () => (
  <aside className="db-sidebar">
    <HomeNav />
    {window.board && <BoardNav board={window.board} />}
    <SidebarFooter />
  </aside>
)

export default Sidebar
