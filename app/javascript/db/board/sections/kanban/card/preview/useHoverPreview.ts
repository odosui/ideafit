import * as React from 'react'
import { useHideOnScroll } from './useHideOnScroll'

const PREVIEW_DELAY_MS = 400

export const useHoverPreview = () => {
  const [anchor, setAnchor] = React.useState<DOMRect | null>(null)
  const timer = React.useRef<number | undefined>(undefined)

  const show = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(
      () => setAnchor(target.getBoundingClientRect()),
      PREVIEW_DELAY_MS,
    )
  }, [])

  const hide = React.useCallback(() => {
    window.clearTimeout(timer.current)
    setAnchor(null)
  }, [])

  React.useEffect(() => () => window.clearTimeout(timer.current), [])
  useHideOnScroll(anchor !== null, hide)

  return { anchor, hide, handlers: { onMouseEnter: show, onMouseLeave: hide } }
}
