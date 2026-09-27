import * as React from 'react'
import useCopied from './useCopied'

interface Props {
  text: string
  label: string
}

const CopyTextButton: React.FC<Props> = ({ text, label }) => {
  const { copied, copy } = useCopied(text)

  return (
    <button type="button" className="btn" onClick={copy}>
      <i
        className={copied ? 'fas fa-check' : 'fas fa-copy'}
        aria-hidden="true"
      />
      {copied ? 'Copied' : label}
    </button>
  )
}

export default CopyTextButton
