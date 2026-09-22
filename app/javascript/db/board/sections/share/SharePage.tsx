import * as React from 'react'
import { Board } from '../../../types'
import PublicLinkCard from './PublicLinkCard'

interface Props {
  board: Board
}

const SharePage: React.FC<Props> = ({ board }) => (
  <section className="share-page">
    <PublicLinkCard pid={board.pid} />
  </section>
)

export default SharePage
