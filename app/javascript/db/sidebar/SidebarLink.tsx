import * as React from 'react'

interface Props {
  href: string
  icon: string
  label: string
  active: boolean
}

const SidebarLink: React.FC<Props> = ({ href, icon, label, active }) => (
  <a
    href={href}
    className={`db-sidebar__item${active ? ' db-sidebar__item--active' : ''}`}
    aria-current={active ? 'page' : undefined}
  >
    <i className={icon} aria-hidden="true" />
    <span>{label}</span>
  </a>
)

export default SidebarLink
