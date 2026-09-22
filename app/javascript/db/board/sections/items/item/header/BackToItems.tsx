import * as React from 'react'
import { boardSectionPath } from '../../../boardSectionPath'

const BackToItems: React.FC<{ pid: string }> = ({ pid }) => (
  <a className="item-header__back" href={boardSectionPath(pid, 'items')}>
    <i className="fas fa-arrow-left" aria-hidden="true" />
    All items
  </a>
)

export default BackToItems
