import * as React from 'react'
import { SETTINGS_PATH } from '../../shared/settingsPath'
import SidebarLink from './SidebarLink'

const currentPath = () => window.location.pathname

const MainNav: React.FC = () => (
  <nav className="db-sidebar__nav">
    <SidebarLink
      href="/"
      icon="fas fa-th-large"
      label="Boards"
      active={currentPath() === '/'}
    />
    <SidebarLink
      href={SETTINGS_PATH}
      icon="fas fa-cog"
      label="Settings"
      active={currentPath() === SETTINGS_PATH}
    />
  </nav>
)

export default MainNav
