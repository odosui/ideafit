import * as React from 'react'
import SidebarLink from './SidebarLink'

const HomeNav: React.FC = () => (
  <nav className="db-sidebar__nav">
    <SidebarLink
      href="/"
      icon="fas fa-home"
      label="Home"
      active={window.location.pathname === '/'}
    />
  </nav>
)

export default HomeNav
