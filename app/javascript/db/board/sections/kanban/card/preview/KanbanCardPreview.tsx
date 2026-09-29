import * as React from 'react'
import { createPortal } from 'react-dom'
import { BoardItem } from '../../../../../types'
import PreviewContent from './PreviewContent'
import { previewPosition } from './previewPosition'

const UNPLACED: React.CSSProperties = { top: 0, left: 0, visibility: 'hidden' }

interface Props {
  item: BoardItem
  anchor: DOMRect
}

const KanbanCardPreview: React.FC<Props> = ({ item, anchor }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState<React.CSSProperties>(UNPLACED)

  React.useLayoutEffect(() => {
    if (ref.current)
      setPosition(previewPosition(anchor, ref.current.getBoundingClientRect()))
  }, [anchor])

  return createPortal(
    <div ref={ref} className="kanban-preview" role="tooltip" style={position}>
      <PreviewContent item={item} />
    </div>,
    document.body,
  )
}

export default KanbanCardPreview
