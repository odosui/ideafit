import * as React from 'react'
import { BoardSection } from './boardSections'

interface Props {
  section: BoardSection
}

const ComingSoon: React.FC<Props> = ({ section }) => (
  <div className="board-coming-soon">
    <i className={section.icon} aria-hidden="true" />
    <h2>{section.label}</h2>
    <p>This section is coming soon.</p>
  </div>
)

export default ComingSoon
