import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../shared/Button'
import ItemFields from './ItemFields'

const CreateItemForm: React.FC<{
  open: boolean
  submitLabel: string
  onCancel: () => void
  onCreate: (title: string, description: string) => Promise<void>
}> = ({ open, submitLabel, onCancel, onCreate }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const titleInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) titleInput.current?.focus({ preventScroll: true })
  }, [open])

  const clear = () => {
    setTitle('')
    setDescription('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) return
    await onCreate(title, description)
    clear()
  }

  const handleCancel = () => {
    clear()
    onCancel()
  }

  return (
    <div className="card">
      <form className="item-form" onSubmit={handleSubmit}>
        <ItemFields
          title={title}
          text={description}
          onTitleChange={setTitle}
          onTextChange={setDescription}
          titleRef={titleInput}
        />
        <div className="item-form__actions">
          <Button className="btn--primary" type="submit" loading={false}>
            {submitLabel}
          </Button>
          <Button className="btn--ghost" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateItemForm
