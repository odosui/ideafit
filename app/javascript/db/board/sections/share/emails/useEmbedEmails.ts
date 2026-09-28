import * as React from 'react'
import api from '../../../../api'
import { EmbedEmails } from './embedEmails'

export const useEmbedEmails = (pid: string) => {
  const [settings, setSettings] = React.useState<EmbedEmails | null>(null)

  React.useEffect(() => {
    let current = true
    api.embedEmails.show(pid).then((data) => {
      if (current && data && 'trust_emails' in data) setSettings(data)
    })
    return () => {
      current = false
    }
  }, [pid])

  return settings
}
