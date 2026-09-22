import * as React from 'react'
import { Board } from '../../../types'
import PublicLinkCard from './PublicLinkCard'

interface Props {
  board: Board
}

const SharePage: React.FC<Props> = ({ board }) => (
  <section className="share-page">
    <h2>Share</h2>
    <PublicLinkCard pid={board.pid} />
  </section>
)

export default SharePage
