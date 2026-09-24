import * as React from 'react'

// 24×24 stroked icon in the text color (Lucide style, ISC license)
const LineIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    className="line-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

export default LineIcon
