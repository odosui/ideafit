import * as React from 'react'
import { Item } from '../../types'
import RoadmapCard from '../card/RoadmapCard'

interface Props {
  title: string
  items: Item[]
  onVote: (item: Item) => void
}

const RoadmapColumn: React.FC<Props> = ({ title, items, onVote }) => (
  <section className="roadmap-column" aria-label={title}>
    <header className="roadmap-column__header">
      <h2 className="roadmap-column__title">{title}</h2>
      <span className="roadmap-column__count">{items.length}</span>
    </header>
    {items.length === 0 ? (
      <p className="roadmap-column__empty">Nothing here yet</p>
    ) : (
      <ul className="roadmap-column__cards">
        {items.map((item) => (
          <RoadmapCard key={item.id} item={item} onVote={onVote} />
        ))}
      </ul>
    )}
  </section>
)

export default RoadmapColumn
