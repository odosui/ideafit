import * as React from 'react'
import { SETTINGS_PATH } from '../../shared/settingsPath'
import SidebarLink from './SidebarLink'

const SidebarFooter: React.FC = () => (
  <nav className="db-sidebar__nav db-sidebar__footer">
    <SidebarLink
      href={SETTINGS_PATH}
      icon="fas fa-cog"
      label="Settings"
      active={window.location.pathname === SETTINGS_PATH}
    />
  </nav>
)

export default SidebarFooter
