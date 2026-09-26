import * as React from 'react'
import { carriesCard, takeCard } from './cardTransfer'

export const useDropZone = (onDrop: (id: number) => void) => {
  const [over, setOver] = React.useState(false)

  const onDragOver = (event: React.DragEvent) => {
    if (!carriesCard(event.dataTransfer)) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setOver(true)
  }

  const onDragLeave = (event: React.DragEvent) => {
    const target = event.relatedTarget as Node | null
    if (!event.currentTarget.contains(target)) setOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setOver(false)
    const id = takeCard(event.dataTransfer)
    if (id) onDrop(id)
  }

  return { over, handlers: { onDragOver, onDragLeave, onDrop: handleDrop } }
}
