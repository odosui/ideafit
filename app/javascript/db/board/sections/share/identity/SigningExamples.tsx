import * as React from 'react'
import CopyTextButton from '../../../../links/CopyTextButton'
import { SIGNING_EXAMPLES } from './signingCode'

const SigningExamples: React.FC = () => {
  const [active, setActive] = React.useState(SIGNING_EXAMPLES[0])

  return (
    <div className="share-card__examples">
      <div
        className="underline-tabs"
        role="tablist"
        aria-label="Server language"
      >
        {SIGNING_EXAMPLES.map((example) => (
          <button
            key={example.language}
            type="button"
            role="tab"
            aria-selected={example === active}
            className={`underline-tabs__tab${example === active ? ' underline-tabs__tab--active' : ''}`}
            onClick={() => setActive(example)}
          >
            {example.language}
          </button>
        ))}
      </div>
      <pre
        className="share-card__code"
        aria-label={`${active.language} signing example`}
      >
        <code>{active.code}</code>
      </pre>
      <div className="share-card__row">
        <CopyTextButton text={active.code} label="Copy code" />
      </div>
    </div>
  )
}

export default SigningExamples
