import * as React from 'react'
import { Board } from '../../../types'
import EmbedSnippetCard from './EmbedSnippetCard'
import EmbedEmailsCard from './emails/EmbedEmailsCard'
import EmbedIdentityCard from './identity/EmbedIdentityCard'
import PublicLinkCard from './PublicLinkCard'

interface Props {
  board: Board
}

const SharePage: React.FC<Props> = ({ board }) => (
  <section className="share-page">
    <PublicLinkCard pid={board.pid} />
    <EmbedSnippetCard pid={board.pid} />
    <EmbedIdentityCard pid={board.pid} />
    <EmbedEmailsCard pid={board.pid} />
  </section>
)

export default SharePage
