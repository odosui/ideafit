import * as React from 'react'
import { settingsTabPath } from './settingsTabPath'
import { SETTINGS_TABS, SettingsTabKey } from './settingsTabs'

interface Props {
  pid: string
  active: SettingsTabKey
}

const SettingsTabNav: React.FC<Props> = ({ pid, active }) => (
  <nav className="underline-tabs" aria-label="Settings sections">
    {SETTINGS_TABS.map((tab) => (
      <a
        key={tab.key}
        href={settingsTabPath(pid, tab.key)}
        className={`underline-tabs__tab${tab.key === active ? ' underline-tabs__tab--active' : ''}`}
        aria-current={tab.key === active ? 'page' : undefined}
      >
        {tab.label}
      </a>
    ))}
  </nav>
)

export default SettingsTabNav
