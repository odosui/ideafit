import * as React from 'react'
import api from '../../../../api'
import { Outbox } from './outbox'

export const useOutbox = (pid: string) => {
  const [outbox, setOutbox] = React.useState<Outbox | null>(null)
  const [version, setVersion] = React.useState(0)

  React.useEffect(() => {
    let current = true
    api.outbox.show(pid).then((data) => {
      if (current) setOutbox(data)
    })
    return () => {
      current = false
    }
  }, [pid, version])

  const reload = React.useCallback(() => setVersion((v) => v + 1), [])

  return { outbox, reload }
}
