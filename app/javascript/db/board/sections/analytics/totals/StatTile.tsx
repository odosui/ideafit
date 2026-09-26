import * as React from 'react'

const NUMBER_FORMAT = new Intl.NumberFormat(undefined, { notation: 'compact' })

interface Props {
  label: string
  value: number
}

const StatTile: React.FC<Props> = ({ label, value }) => (
  <div className="stat-tile">
    <span className="stat-tile__label">{label}</span>
    <span className="stat-tile__value">{NUMBER_FORMAT.format(value)}</span>
  </div>
)

export default StatTile
