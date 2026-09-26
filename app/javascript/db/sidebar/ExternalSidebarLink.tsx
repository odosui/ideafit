import * as React from 'react'

interface Props {
  href: string
  icon: string
  label: string
}

const ExternalSidebarLink: React.FC<Props> = ({ href, icon, label }) => (
  <a
    href={href}
    className="db-sidebar__item"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className={icon} aria-hidden="true" />
    <span>{label}</span>
    <i
      className="fas fa-external-link-alt db-sidebar__external-icon"
      aria-hidden="true"
    />
  </a>
)

export default ExternalSidebarLink
