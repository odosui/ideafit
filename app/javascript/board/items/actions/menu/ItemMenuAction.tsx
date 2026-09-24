import * as React from 'react'
import { MenuAction } from './menuAction'

interface Props {
  action: MenuAction
  onDone: () => void
}

const ItemMenuAction: React.FC<Props> = ({ action, onDone }) => (
  <button
    type="button"
    role="menuitem"
    className={`item-menu__action${action.danger ? ' item-menu__action--danger' : ''}`}
    onClick={() => {
      onDone()
      action.onSelect()
    }}
  >
    {action.icon}
    {action.label}
  </button>
)

export default ItemMenuAction
