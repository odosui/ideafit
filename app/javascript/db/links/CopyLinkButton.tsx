import * as React from 'react'
import useCopied from './useCopied'

interface Props {
  url: string
  className: string
  showLabel?: boolean
}

const CopyLinkButton: React.FC<Props> = ({ url, className, showLabel }) => {
  const { copied, copy } = useCopied(url)
  const label = copied ? 'Link copied' : 'Copy public link'

  return (
    <button
      type="button"
      className={className}
      onClick={copy}
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
