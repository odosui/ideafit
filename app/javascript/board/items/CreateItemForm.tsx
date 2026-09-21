import React, { useEffect, useRef, useState } from 'react'
import Button from '../../shared/Button'

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
    if (!open) return
    setTitle('')
    setDescription('')
    titleInput.current?.focus({ preventScroll: true })
  }, [open])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) return
    await onCreate(title, description)
  }

  return (
    <div className="card">
      <form className="item-form" onSubmit={handleSubmit}>
        <input
          className="input"
          ref={titleInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="item-form__actions">
          <Button className="btn--primary" type="submit" loading={false}>
            {submitLabel}
          </Button>
          <Button className="btn--ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateItemForm
