import * as React from 'react'

interface Props {
  title: string
  className?: string
  children: React.ReactNode
}

const AnalyticsCard: React.FC<Props> = ({ title, className, children }) => (
  <section
    className={['analytics-card', className].filter(Boolean).join(' ')}
    aria-label={title}
  >
    <h3 className="analytics-card__title">{title}</h3>
    {children}
  </section>
)

export default AnalyticsCard
