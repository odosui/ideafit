import * as React from 'react'
import showToast from '../../../../../shared/toaster'
import api from '../../../../api'
import { BoardItem } from '../../../../types'
import { ItemStatus, toneOf } from '../../../../../shared/items/itemStatus'
import { ITEM_STATUSES, labelOfStatus } from '../options/itemStatuses'

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
    <select
      className={`select select--sm status-select status-select--${toneOf(item.status)}`}
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
  )
}

export default StatusSelect
