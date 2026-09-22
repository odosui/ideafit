import * as React from 'react'
import CopyLinkButton from '../../../links/CopyLinkButton'
import { publicBoardUrl } from '../../../links/publicBoardUrl'

interface Props {
  pid: string
}

const PublicLinkCard: React.FC<Props> = ({ pid }) => {
  const url = publicBoardUrl(pid)

  return (
    <div className="share-card">
      <div>
        <h3>Public link</h3>
        <p>Anyone with this link can view the board and submit feedback.</p>
      </div>
      <div className="share-card__row">
        <input
          className="input"
          type="text"
          value={url}
          readOnly
          aria-label="Public link"
          onFocus={(e) => e.target.select()}
        />
        <CopyLinkButton url={url} className="btn" showLabel />
        <a className="btn" href={url} target="_blank" rel="noopener noreferrer">
          Open board
          <i className="fas fa-external-link-alt" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

export default PublicLinkCard
