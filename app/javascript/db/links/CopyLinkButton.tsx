import * as React from 'react'
import copyToClipboard from '../../shared/copyToClipboard'

interface Props {
  url: string
  className: string
  showLabel?: boolean
}

const COPIED_FEEDBACK_MS = 2000

const CopyLinkButton: React.FC<Props> = ({ url, className, showLabel }) => {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS)
    return () => window.clearTimeout(timer)
  }, [copied])

  const handleClick = async () => {
    setCopied(await copyToClipboard(url))
  }

  const label = copied ? 'Link copied' : 'Copy public link'

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      title={label}
      aria-label={label}
    >
      <i
        className={copied ? 'fas fa-check' : 'fas fa-link'}
        aria-hidden="true"
      />
      {showLabel && (copied ? 'Copied' : 'Copy link')}
    </button>
  )
}

export default CopyLinkButton
