import * as React from 'react'
import { useDismiss } from '../../../../shared/hooks/useDismiss'
import EllipsisIcon from '../icons/EllipsisIcon'
import ItemMenuAction from './ItemMenuAction'
import { MenuAction } from './menuAction'

const ItemMenu: React.FC<{ actions: MenuAction[] }> = ({ actions }) => {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const close = React.useCallback(() => setOpen(false), [])
  useDismiss(ref, open, close)

  return (
    <div className="item-menu" ref={ref}>
      <button
        type="button"
        className="item-menu__toggle"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <EllipsisIcon />
      </button>
      {open && (
        <div className="item-menu__popover" role="menu">
          {actions.map((action) => (
            <ItemMenuAction key={action.label} action={action} onDone={close} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemMenu
