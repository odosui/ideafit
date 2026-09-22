import React from 'react'

const Collapse: React.FC<React.PropsWithChildren<{ open: boolean }>> = ({
  open,
  children,
}) => (
  <div
    className={`collapse${open ? ' collapse--open' : ''}`}
    aria-hidden={!open}
  >
    <div className="collapse__inner">{children}</div>
  </div>
)

export default Collapse
