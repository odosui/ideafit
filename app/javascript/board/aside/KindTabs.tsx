import * as React from 'react'
import { boardPathForKind } from '../routing/boardLocation'
import { ItemKind } from '../../shared/items/itemKind'

const KIND_LABELS: [ItemKind, string][] = [
  ['idea', 'Ideas'],
  ['bug', 'Bugs'],
  ['question', 'Questions'],
]

interface Props {
  kind: ItemKind
  onChange: (kind: ItemKind) => void
}

const opensInNewTab = (e: React.MouseEvent) =>
  e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0

const KindTabs: React.FC<Props> = ({ kind, onChange }) => (
  <nav className="pill-tabs" aria-label="Item kinds">
    {KIND_LABELS.map(([value, label]) => (
      <a
        key={value}
        href={boardPathForKind(value)}
        aria-current={kind === value ? 'page' : undefined}
        className={`pill-tabs__tab${kind === value ? ' pill-tabs__tab--active' : ''}`}
        onClick={(e) => {
          if (opensInNewTab(e)) return
          e.preventDefault()
          onChange(value)
        }}
      >
        {label}
      </a>
    ))}
  </nav>
)

export default KindTabs
