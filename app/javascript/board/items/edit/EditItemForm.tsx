import * as React from 'react'
import Button from '../../../shared/Button'
import ItemFields from '../form/ItemFields'
import { Item } from '../../types'

interface Props {
  item: Item
  onSave: (title: string, text: string) => Promise<void>
  onCancel: () => void
}

const EditItemForm: React.FC<Props> = ({ item, onSave, onCancel }) => {
  const [title, setTitle] = React.useState(item.title)
  const [text, setText] = React.useState(item.text ?? '')
  const [saving, setSaving] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    await onSave(title, text)
  }

  return (
    <form
      className="item-form"
      aria-label={`Edit ${item.title}`}
      onSubmit={handleSubmit}
    >
      <ItemFields
        title={title}
        text={text}
        onTitleChange={setTitle}
        onTextChange={setText}
      />
      <div className="item-form__actions">
        <Button className="btn--primary" type="submit" loading={saving}>
          Save
        </Button>
        <Button className="btn--ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default EditItemForm
