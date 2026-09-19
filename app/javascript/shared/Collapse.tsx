import React from 'react'

const Collapse: React.FC<{ open: boolean }> = ({ open, children }) => (
  <div
    className={`collapse${open ? ' collapse--open' : ''}`}
    aria-hidden={!open}
  >
    <div className="collapse__inner">{children}</div>
  </div>
)

export default Collapse
