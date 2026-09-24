import * as React from 'react'
import CopySnippetButton from '../../../links/CopySnippetButton'
import { embedSnippet } from '../../../links/embedSnippet'

interface Props {
  pid: string
}

const EmbedSnippetCard: React.FC<Props> = ({ pid }) => {
  const snippet = embedSnippet(pid)

  return (
    <div className="share-card">
      <div>
        <h3>Embed on your site</h3>
        <p>
          Paste this into your site's HTML. The button opens the board in a
          popup.
        </p>
      </div>
      <pre className="share-card__code" aria-label="Embed snippet">
        <code>{snippet}</code>
      </pre>
      <div className="share-card__row">
        <CopySnippetButton snippet={snippet} />
      </div>
    </div>
  )
}

export default EmbedSnippetCard
