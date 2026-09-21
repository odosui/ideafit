import { animated, useTransition } from '@react-spring/web'
import React, { useContext, useState } from 'react'
import Button from '../shared/Button'
import Collapse from '../shared/Collapse'
import Spinner from '../shared/Spinner'
import readServerData from '../shared/server'
import { StateContext } from './StateProvider'
import Voter from './Voter'
import FilterTabs from './FilterTabs'
import Header from './Header'
import BoardAside from './aside/BoardAside'
import StatusBadge from './items/StatusBadge'
import StatusSelect from './items/StatusSelect'
import CreateItemForm from './items/CreateItemForm'
import { Item, ItemKind } from './types'
import showToast from '../shared/toaster'
import { labelsForKind } from './items/kindLabels'

const { isOwner } = readServerData()

const IDEA_LIST_ANIMATIONS = {
  from: { opacity: 0, transform: 'scale(0.5)' },
  enter: { opacity: 1, transform: 'scale(1)' },
  leave: { opacity: 0, transform: 'scale(0.5)' },
  keys: (idea: Item) => idea.id,
}

const BoardPage: React.FC<{ onKindChange: (kind: ItemKind) => void }> = ({
  onKindChange,
}) => {
  const {
    ui: {
      data: { filter, kindTab },
      actions: { setFilter, showLoginForm },
    },
    domain: {
      data: {
        items: { loading, data: items },
      },
      actions: { upvote, downvote, createItem, removeItem, changeStatus },
    },
  } = useContext(StateContext)

  const [showForm, setShowForm] = useState(false)
  const labels = labelsForKind(kindTab)

  const ideasWithAnimations = useTransition(items ?? [], IDEA_LIST_ANIMATIONS)

  const handleCreate = async (title: string, description: string) => {
    await createItem(kindTab, title, description)
    setShowForm(false)
    showToast(labels.added)
  }

  const handleVoterClicked = async (itemId: number) => {
    const item = (items ?? []).find((i) => i.id === itemId)
    if (!item) return
    if (!item.voted) {
      await upvote(itemId)
    } else {
      await downvote(itemId)
    }
  }

  const handleShowIdeaForm = () => {
    const { user } = readServerData()
    if (!user) {
      showLoginForm()
      return
    }

    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm(labels.confirmDelete)) return
    await removeItem(id)
    showToast(labels.deleted)
  }

  return (
    <div className="board-page">
      <Header />
      <div className="board-layout">
        <BoardAside kind={kindTab} onKindChange={onKindChange} />
        <main className="board-main">
          <div>
            <FilterTabs
              filter={filter}
              isOwner={isOwner}
              onChange={setFilter}
            />
            <div aria-live="polite" role="tabpanel">
              <div className="item-form-area">
                <Collapse open={!showForm}>
                  <div className="item-form-toggle">
                    <Button className="btn--primary" onClick={handleShowIdeaForm}>
                      <i className="ti-plus" />
                      {labels.addButton}
                    </Button>
                  </div>
                </Collapse>
                <Collapse open={showForm}>
                  <CreateItemForm
                    open={showForm}
                    submitLabel={labels.addButton}
                    onCancel={() => setShowForm(false)}
                    onCreate={handleCreate}
                  />
                </Collapse>
              </div>
              <div className="item-list">
                {loading && (
                  <div className="board-loading">
                    <Spinner />
                  </div>
                )}

                {ideasWithAnimations((style, idea) => (
                  <animated.div className="item" style={style} key={idea.id}>
                    <div className="item__body">
                      <h3 className="item__title">{idea.title}</h3>
                      <p className="item__text">{idea.text}</p>
                      <div className="item__footer">
                        <div>
                          {isOwner ? (
                            <StatusSelect
                              status={idea.status}
                              onChange={(status) =>
                                changeStatus(idea.id, status)
                              }
                            />
                          ) : (
                            <StatusBadge status={idea.status} />
                          )}
                        </div>
                        <div>
                          {idea.can_edit && (
                            <Button
                              className="btn--ghost btn--danger btn--sm"
                              onClick={(e) => {
                                e.preventDefault()
                                handleDelete(idea.id)
                              }}
                            >
                              <i className="ti-close"></i> Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Voter
                      onClick={() => handleVoterClicked(idea.id)}
                      count={idea.votes}
                      voted={idea.voted}
                    />
                  </animated.div>
                ))}
              </div>
            </div>
          </div>
          {!loading && items && items.length === 0 && (
            <div className="board-empty">{labels.empty}</div>
          )}
        </main>
      </div>
    </div>
  )
}

export default BoardPage
