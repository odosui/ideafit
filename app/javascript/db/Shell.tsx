import * as React from 'react'
import AppHeader from '../shared/header/AppHeader'
import { useCurrentUser } from './account/CurrentUserContext'
import Sidebar from './Sidebar'

const Shell: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useCurrentUser()

  return (
    <div className="db-shell">
      <AppHeader user={user} />
      <Sidebar />
      <main className="db-main">
        <div className="db-main__inner">{children}</div>
      </main>
    </div>
  )
}

export default Shell
