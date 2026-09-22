import * as React from 'react'
import Button from '../../../shared/Button'

interface Props {
  confirmation: string
  onDelete: () => void
}

const DeleteItemButton: React.FC<Props> = ({ confirmation, onDelete }) => (
  <Button
    className="btn--ghost btn--danger btn--sm"
    onClick={(e) => {
      e.preventDefault()
      if (window.confirm(confirmation)) onDelete()
    }}
  >
    <i className="ti-close"></i> Delete
  </Button>
)

export default DeleteItemButton
