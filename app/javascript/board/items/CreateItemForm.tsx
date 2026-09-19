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
    <div className="create-idea-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            ref={titleInput}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <Button type="submit" loading={false}>
            {submitLabel}
          </Button>
          <a
            href="#"
            style={{ marginLeft: '8px' }}
            onClick={(e) => {
              e.preventDefault()
              onCancel()
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}

export default CreateItemForm
