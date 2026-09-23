import * as React from 'react'

interface Props {
  title: string
  text: string
  onTitleChange: (title: string) => void
  onTextChange: (text: string) => void
  titleRef?: React.Ref<HTMLInputElement>
}

const ItemFields: React.FC<Props> = ({
  title,
  text,
  onTitleChange,
  onTextChange,
  titleRef,
}) => (
  <>
    <input
      className="input"
      ref={titleRef}
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      required
    />
    <textarea
      className="textarea"
      placeholder="Description"
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      required
    />
  </>
)

export default ItemFields
