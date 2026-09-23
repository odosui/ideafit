import * as React from 'react'
import { StatusTone } from './items/itemStatus'

interface Props {
  tone?: StatusTone
  dot?: boolean
  className?: string
  children: React.ReactNode
}

const Chip: React.FC<Props> = ({
  tone = 'neutral',
  dot = false,
  className,
  children,
}) => (
  <span
    className={['chip', `chip--${tone}`, className].filter(Boolean).join(' ')}
  >
    {dot && <span className="chip__dot" aria-hidden="true" />}
    {children}
  </span>
)

export default Chip
