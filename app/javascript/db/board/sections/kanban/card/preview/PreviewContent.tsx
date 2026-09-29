import * as React from 'react'
import KindIcon from '../../../../../../shared/items/KindIcon'
import { BoardItem } from '../../../../../types'
import { formatDate } from '../../../items/dates/formatDate'
import { labelOfKind } from '../../../items/options/itemKinds'

const PreviewContent: React.FC<{ item: BoardItem }> = ({ item }) => (
  <>
    <span className="kanban-preview__kind">
      <KindIcon kind={item.kind} />
      {labelOfKind(item.kind)}
    </span>
    <strong className="kanban-preview__title">{item.title}</strong>
    {item.text ? (
      <p className="kanban-preview__text">{item.text}</p>
    ) : (
      <p className="kanban-preview__text kanban-preview__text--empty">
        No description.
      </p>
    )}
    <span className="kanban-preview__meta">
      {item.author} · {formatDate(item.created_at)} · {item.votes} votes
    </span>
  </>
)

export default PreviewContent
