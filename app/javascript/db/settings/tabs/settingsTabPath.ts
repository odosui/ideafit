import { DEFAULT_SETTINGS_TAB, SettingsTabKey } from './settingsTabs'

export const settingsTabPath = (pid: string, tab: SettingsTabKey) => {
  const base = `/db/boards/${pid}/settings`
  return tab === DEFAULT_SETTINGS_TAB ? base : `${base}/${tab}`
}
