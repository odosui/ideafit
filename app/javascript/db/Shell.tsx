import * as React from 'react'
import AppHeader from '../shared/header/AppHeader'
import Sidebar from './Sidebar'

const Shell: React.FC = ({ children }) => (
  <div className="db-shell">
    <AppHeader email={window.user?.email ?? null} />
    <Sidebar />
    <main className="db-main">
      <div className="db-main__inner">{children}</div>
    </main>
  </div>
)

export default Shell
