import * as React from 'react'
import CopyTextButton from '../../../../links/CopyTextButton'
import { identifiedEmbedSnippet } from '../../../../links/embedSnippet'
import SigningExamples from './SigningExamples'
import SigningSecretField from './SigningSecretField'

interface Props {
  pid: string
}

const EmbedIdentityCard: React.FC<Props> = ({ pid }) => {
  const snippet = identifiedEmbedSnippet(pid)

  return (
    <div className="share-card">
      <div>
        <h3>Sign in your users</h3>
        <p>
          Your users are already signed in on your site, so they shouldn't have
          to sign in again to vote. Sign a token for them on your server with
          this secret and pass it to the widget. Keep the secret on your server:
          anyone who has it can act as any of your users. One secret covers
          every board in this workspace.
        </p>
      </div>
      <SigningSecretField pid={pid} />
      <SigningExamples />
      <p>
        Then pass the token to the widget, or call{' '}
        <code>IdeaFit.identify(token)</code> once you have it.
      </p>
      <pre className="share-card__code" aria-label="Signed-in embed snippet">
        <code>{snippet}</code>
      </pre>
      <div className="share-card__row">
        <CopyTextButton text={snippet} label="Copy signed-in snippet" />
      </div>
    </div>
  )
}

export default EmbedIdentityCard
