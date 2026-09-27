import {
  DEFAULT_SETTINGS_TAB,
  SETTINGS_TABS,
  SettingsTabKey,
} from './settingsTabs'

const tabSegment = (pathname: string) => pathname.split('/')[5]

export const currentSettingsTab = (): SettingsTabKey => {
  const key = tabSegment(window.location.pathname)
  return (
    SETTINGS_TABS.find((tab) => tab.key === key)?.key ?? DEFAULT_SETTINGS_TAB
  )
}
