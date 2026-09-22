import * as React from 'react'
import Collapse from '../../../shared/Collapse'
import CreateItemForm from './CreateItemForm'

interface Props {
  open: boolean
  submitLabel: string
  onCancel: () => void
  onCreate: (title: string, text: string) => Promise<void>
}

const NewItemArea: React.FC<Props> = ({ open, ...formProps }) => (
  <div className="item-form-area">
    <Collapse open={open}>
      <CreateItemForm open={open} {...formProps} />
    </Collapse>
  </div>
)

export default NewItemArea
