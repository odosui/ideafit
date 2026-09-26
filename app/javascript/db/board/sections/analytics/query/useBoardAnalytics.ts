import * as React from 'react'
import api from '../../../../api'
import { BoardAnalytics } from './boardAnalytics'

export const useBoardAnalytics = (pid: string) => {
  const [analytics, setAnalytics] = React.useState<BoardAnalytics | null>(null)

  React.useEffect(() => {
    let current = true
    api.analytics.show(pid).then((data) => {
      if (current) setAnalytics(data)
    })
    return () => {
      current = false
    }
  }, [pid])

  return analytics
}
