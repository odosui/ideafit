export type SettingsTabKey = 'general' | 'import' | 'danger'

export interface SettingsTab {
  key: SettingsTabKey
  label: string
}

export const SETTINGS_TABS: SettingsTab[] = [
  { key: 'general', label: 'General' },
  { key: 'import', label: 'Import & export' },
  { key: 'danger', label: 'Danger zone' },
]

export const DEFAULT_SETTINGS_TAB: SettingsTabKey = 'general'
