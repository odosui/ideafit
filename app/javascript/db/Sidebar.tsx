import * as React from 'react'

type NavItem = {
  label: string
  icon: string
  href: string
  active?: boolean
}

const navItems: NavItem[] = [
  { label: 'Boards', icon: 'fas fa-th-large', href: '/', active: true },
  { label: 'Settings', icon: 'fas fa-cog', href: '#' },
]

const Sidebar: React.FC = () => {
  return (
    <aside className="db-sidebar">
      <nav className="db-sidebar__nav">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`db-sidebar__item${
              item.active ? ' db-sidebar__item--active' : ''
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
