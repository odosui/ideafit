import * as React from 'react'
import { useDismiss } from '../../../../../../shared/hooks/useDismiss'

interface Props {
  children: (close: () => void) => React.ReactNode
}

const ToolbarMenu: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const close = React.useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  return (
    <div className="toolbar-menu" ref={ref}>
      <button
        type="button"
        className="toolbar-menu__toggle"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <i className="fas fa-ellipsis-h" aria-hidden="true" />
      </button>
      {open && (
        <div className="toolbar-menu__popover" role="menu">
          {children(close)}
        </div>
      )}
    </div>
  )
}

export default ToolbarMenu
