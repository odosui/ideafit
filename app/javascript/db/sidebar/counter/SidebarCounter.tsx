import * as React from 'react'
import { CounterTone } from './counterTone'

interface Props {
  value: number
  tone: CounterTone
}

const SidebarCounter: React.FC<Props> = ({ value, tone }) =>
  value > 0 ? (
    <span className={`sidebar-counter sidebar-counter--${tone}`}>{value}</span>
  ) : null

export default SidebarCounter
