import * as React from 'react'
import { Item } from '../../../types'
import PencilIcon from '../icons/PencilIcon'
import TrashIcon from '../icons/TrashIcon'
import { MenuAction } from './menuAction'

interface Handlers {
  deleteConfirmation: string
  onEditStart: () => void
  onDelete: () => void
}

// What the author or an admin may do with the item
export const itemMenuActions = (item: Item, handlers: Handlers) => {
  const actions: MenuAction[] = []
  if (item.can_edit) {
    actions.push({
      label: 'Edit',
      icon: <PencilIcon />,
      onSelect: handlers.onEditStart,
    })
  }
  if (item.can_delete) {
    actions.push({
      label: 'Delete',
      icon: <TrashIcon />,
      danger: true,
      onSelect: () =>
        window.confirm(handlers.deleteConfirmation) && handlers.onDelete(),
    })
  }
  return actions
}
