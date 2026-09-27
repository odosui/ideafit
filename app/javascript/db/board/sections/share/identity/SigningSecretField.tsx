import * as React from 'react'
import Button from '../../../../../shared/Button'
import CopyTextButton from '../../../../links/CopyTextButton'
import { useEmbedSecret } from './useEmbedSecret'

interface Props {
  pid: string
}

const REGENERATE_WARNING =
  'Generate a new secret? The current one keeps working until you regenerate again, so update your site before then.'

const SigningSecretField: React.FC<Props> = ({ pid }) => {
  const { state, reveal, regenerate } = useEmbedSecret(pid)
  const loading = state.status === 'loading'

  const handleRegenerate = () => {
    if (window.confirm(REGENERATE_WARNING)) regenerate()
  }

  if (state.status !== 'shown') {
    return (
      <div className="share-card__row">
        <Button onClick={reveal} loading={loading}>
          <i className="fas fa-key" aria-hidden="true" />
          Show signing secret
        </Button>
        {state.status === 'failed' && (
          <span className="field__error">Couldn't load the secret.</span>
        )}
      </div>
    )
  }

  if (!state.secret) {
    return (
      <div className="share-card__row">
        <Button className="btn--primary" onClick={regenerate}>
          Generate signing secret
        </Button>
      </div>
    )
  }

  return (
    <div className="share-card__row">
      <input
        className="input share-card__secret"
        type="text"
        value={state.secret}
        readOnly
        aria-label="Signing secret"
        onFocus={(e) => e.target.select()}
      />
      <CopyTextButton text={state.secret} label="Copy" />
      <Button onClick={handleRegenerate}>Regenerate</Button>
    </div>
  )
}

export default SigningSecretField
