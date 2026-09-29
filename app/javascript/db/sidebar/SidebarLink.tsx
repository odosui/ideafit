import * as React from 'react'

interface Props {
  href: string
  icon: string
  label: string
  active: boolean
  children?: React.ReactNode
}

const SidebarLink: React.FC<Props> = ({
  href,
  icon,
  label,
  active,
  children,
}) => (
  <a
    href={href}
    className={`db-sidebar__item${active ? ' db-sidebar__item--active' : ''}`}
    aria-current={active ? 'page' : undefined}
  >
    <i className={icon} aria-hidden="true" />
    <span>{label}</span>
    {children}
  </a>
)

export default SidebarLink
