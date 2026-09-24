import * as React from 'react'
import copyToClipboard from '../../shared/copyToClipboard'

const COPIED_FEEDBACK_MS = 2000

export default function useCopied(text: string) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => setCopied(await copyToClipboard(text))

  return { copied, copy }
}
