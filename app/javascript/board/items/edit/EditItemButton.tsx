import * as React from 'react'
import Button from '../../../shared/Button'

const EditItemButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button className="btn--ghost btn--sm" onClick={onClick}>
    <i className="ti-pencil"></i> Edit
  </Button>
)

export default EditItemButton
