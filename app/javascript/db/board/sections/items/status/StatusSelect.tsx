import * as React from 'react'
import Chip from '../../../../../shared/Chip'
import StackedLabels from '../../../../../shared/StackedLabels'
import showToast from '../../../../../shared/toaster'
import api from '../../../../api'
import { BoardItem } from '../../../../types'
import { ItemStatus, toneOf } from '../../../../../shared/items/itemStatus'
import { ITEM_STATUSES, labelOfStatus } from '../options/itemStatuses'

const STATUS_LABELS = ITEM_STATUSES.map((option) => option.label)

interface Props {
  item: BoardItem
  onChanged: (item: BoardItem) => void
}

const StatusSelect: React.FC<Props> = ({ item, onChanged }) => {
  const [saving, setSaving] = React.useState(false)

  const handleChange = async (status: ItemStatus) => {
    setSaving(true)
    const saved = await api.items.setStatus(item.id, status).catch(() => null)
    setSaving(false)
    if (!saved?.status)
      return showToast("Couldn't change the status. Please try again.", 'error')

    onChanged({ ...item, status: saved.status })
    showToast(`Status changed to ${labelOfStatus(saved.status)}`)
  }

  return (
    <Chip tone={toneOf(item.status)} dot className="status-select">
      <StackedLabels
        labels={STATUS_LABELS}
        current={labelOfStatus(item.status)}
      />
      <i
        className="fas fa-chevron-down status-select__chevron"
        aria-hidden="true"
      />
      <select
        className="select-overlay"
        aria-label={`Status of ${item.title}`}
        value={item.status}
        disabled={saving}
        onChange={(e) => handleChange(e.target.value as ItemStatus)}
      >
        {ITEM_STATUSES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Chip>
  )
}

export default StatusSelect
