import * as React from 'react'

export const useDismiss = (
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  onDismiss: () => void,
) => {
  React.useEffect(() => {
    if (!active) return

    const handlePointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onDismiss()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }

    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [ref, active, onDismiss])
}
