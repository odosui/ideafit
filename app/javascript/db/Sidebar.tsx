import * as React from 'react'
import { SETTINGS_PATH } from '../shared/settingsPath'

type NavItem = {
  label: string
  icon: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Boards', icon: 'fas fa-th-large', href: '/' },
  { label: 'Settings', icon: 'fas fa-cog', href: SETTINGS_PATH },
]

const isActive = (item: NavItem) => {
  const onSettings = window.location.pathname === SETTINGS_PATH
  return item.href === SETTINGS_PATH ? onSettings : !onSettings
}

const Sidebar: React.FC = () => {
  return (
    <aside className="db-sidebar">
      <nav className="db-sidebar__nav">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`db-sidebar__item${
              isActive(item) ? ' db-sidebar__item--active' : ''
            }`}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
