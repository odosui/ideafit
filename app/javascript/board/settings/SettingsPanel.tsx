import * as React from 'react'
import EmailUpdatesSwitch from '../emailConsent/EmailUpdatesSwitch'
import { useHasBoardSettings } from './useHasBoardSettings'

const SettingsPanel: React.FC = () => (
  <section className="board-settings" aria-labelledby="board-settings-title">
    <h2 id="board-settings-title" className="board-settings__title">
      Settings
    </h2>
    {useHasBoardSettings() ? (
      <EmailUpdatesSwitch />
    ) : (
      <p className="board-settings__empty">There's nothing to set up here.</p>
    )}
  </section>
)

export default SettingsPanel
