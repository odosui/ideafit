import * as React from 'react'
import useCopied from './useCopied'

interface Props {
  snippet: string
}

const CopySnippetButton: React.FC<Props> = ({ snippet }) => {
  const { copied, copy } = useCopied(snippet)

  return (
    <button type="button" className="btn" onClick={copy}>
      <i
        className={copied ? 'fas fa-check' : 'fas fa-code'}
        aria-hidden="true"
      />
      {copied ? 'Copied' : 'Copy snippet'}
    </button>
  )
}

export default CopySnippetButton
