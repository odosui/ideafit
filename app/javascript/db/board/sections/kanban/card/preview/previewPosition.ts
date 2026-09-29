const GAP = 8
const MARGIN = 16

interface Size {
  width: number
  height: number
}

// Places the preview beside the card, flipping left when the right side is cramped.
export const previewPosition = (anchor: DOMRect, { width, height }: Size) => {
  const fitsRight = anchor.right + GAP + width + MARGIN <= window.innerWidth
  const left = fitsRight
    ? anchor.right + GAP
    : Math.max(MARGIN, anchor.left - GAP - width)
  const top = Math.max(
    MARGIN,
    Math.min(anchor.top, window.innerHeight - height - MARGIN),
  )

  return { left, top }
}
