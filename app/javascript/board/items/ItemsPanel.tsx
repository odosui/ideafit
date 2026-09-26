import * as React from 'react'
import { ItemKind } from '../../shared/items/itemKind'
import showToast from '../../shared/toaster'
import api from '../api'
import { useRequireSignIn } from '../signIn/useRequireSignIn'
import BoardToolbar from '../toolbar/BoardToolbar'
import { Item } from '../types'
import { useFollowToggle } from './actions/follow/useFollowToggle'
import { emptyMessage } from './empty/emptyMessage'
import NewItemArea from './form/NewItemArea'
import { labelsForKind } from './kindLabels'
import ItemList from './list/ItemList'
import { DEFAULT_ITEM_FILTER, ItemFilter } from './query/itemFilter'
import { useBoardItems } from './query/useBoardItems'
import { useVoteToggle } from './voting/useVoteToggle'

interface Props {
  pid: string
  kind: ItemKind
}

const ItemsPanel: React.FC<Props> = ({ pid, kind }) => {
  const [filter, setFilter] = React.useState<ItemFilter>(DEFAULT_ITEM_FILTER)
  const [formOpen, setFormOpen] = React.useState(false)
  const { items, itemsKey, loading, reload, replaceItem } = useBoardItems(
    pid,
    kind,
    filter,
  )
  const requireSignIn = useRequireSignIn()
  const toggleVote = useVoteToggle(replaceItem)
  const toggleFollow = useFollowToggle(replaceItem)
  const labels = labelsForKind(kind)

  const createItem = async (title: string, text: string) => {
    await api.items.create(pid, kind, title, text)
    setFormOpen(false)
    showToast(labels.added)
    reload()
  }

  const editItem = async (item: Item, title: string, text: string) => {
    const result = await api.items.edit(item.id, title, text)
    if (!result || 'success' in result) {
      showToast('Your changes could not be saved', 'error')
      reload()
      return
    }
    replaceItem(result)
    showToast(labels.edited)
  }

  const deleteItem = async (item: Item) => {
    await api.items.remove(item.id)
    showToast(labels.deleted)
    reload()
  }

  return (
    <>
      <div>
        <BoardToolbar
          filter={filter}
          onFilterChange={setFilter}
          addLabel={labels.addButton}
          addHidden={formOpen}
          onAdd={() => requireSignIn(() => setFormOpen(true))}
        />
        <div aria-live="polite" role="tabpanel">
          <NewItemArea
            open={formOpen}
            submitLabel={labels.addButton}
            onCancel={() => setFormOpen(false)}
            onCreate={createItem}
          />
          <ItemList
            items={items}
            itemsKey={itemsKey}
            loading={loading}
            deleteConfirmation={labels.confirmDelete}
            onVote={toggleVote}
            onFollow={toggleFollow}
            onEdit={editItem}
            onDelete={deleteItem}
          />
        </div>
      </div>
      {!loading && items?.length === 0 && (
        <div className="board-empty">{emptyMessage(kind, filter)}</div>
      )}
    </>
  )
}

export default ItemsPanel
