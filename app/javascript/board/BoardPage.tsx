import { animated, config, useSpring, useTransition } from '@react-spring/web'
import React, { useContext, useState } from 'react'
import Button from '../shared/Button'
import Spinner from '../shared/Spinner'
import readServerData from '../shared/server'
import { StateContext } from './StateProvider'
import Voter from './Voter'
import FilterTabs from './FilterTabs'
import Header from './Header'
import BoardAside from './aside/BoardAside'
import StatusBadge from './items/StatusBadge'
import StatusSelect from './items/StatusSelect'
import { Item, ItemKind } from './types'
import showToast from '../shared/toaster'

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

  const formAnimations = useSpring({
    opacity: showForm ? 1 : 0,
    transform: showForm ? 'translate3d(0,0,0)' : 'translate3d(0,-100%,0)',
    config: {
      ...config.gentle,
      duration: 200,
    },
  })

  const ideasWithAnimations = useTransition(items ?? [], IDEA_LIST_ANIMATIONS)

  const handleCreate = async (title: string, description: string) => {
    await createItem('idea', title, description)
    setShowForm(false)
    showToast('Idea added! 🍕')
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
    if (!window.confirm('Are you sure want to delete this idea?')) return
    await removeItem(id)
    showToast('Idea successfully deleted! 🍕')
  }

  return (
    <div className="board-page">
      <Header />
      <div className="board-layout">
        <BoardAside kind={kindTab} onKindChange={onKindChange} />
        <main className="ideas-page">
          <div className="tabbed">
            <FilterTabs
              filter={filter}
              isOwner={isOwner}
              onChange={setFilter}
            />
            <div
              aria-live="polite"
              role="tabpanel"
              className="tabbed-content"
            >
              <div className="idea-form">
                {!showForm && (
                  <div className="add-new-btn">
                    <Button onClick={handleShowIdeaForm}>
                      <i className="ti-plus" />
                      Add Idea
                    </Button>
                  </div>
                )}
                {showForm && (
                  <animated.div style={formAnimations}>
                    <CreateIdeaForm
                      onCancel={() => setShowForm(false)}
                      onCreate={handleCreate}
                    />
                  </animated.div>
                )}
              </div>
              <div className="ideas">
                {loading && (
                  <div className="spinner-wrapper">
                    <Spinner />
                  </div>
                )}

                {ideasWithAnimations((style, idea) => (
                  <animated.div className="idea" style={style} key={idea.id}>
                    <div className="idea-title">
                      <h3>{idea.title}</h3>
                      <p>{idea.text}</p>
                      <div className="idea-actions">
                        <div className="left">
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
                        <div className="right">
                          {idea.can_edit && (
                            <Button
                              className="mini transparent danger"
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
            <div className="no-data">Be the first to add an idea! 💡</div>
          )}
        </main>
      </div>
    </div>
  )
}

export default BoardPage

const CreateIdeaForm: React.FC<{
  onCancel: () => void
  onCreate: (title: string, description: string) => Promise<void>
}> = ({ onCancel, onCreate }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) return
    await onCreate(title, description)
  }

  return (
    <div className="create-idea-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            autoFocus={true}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <Button type="submit" loading={false}>
            Add Idea
          </Button>
          <a
            href="#"
            style={{ marginLeft: '8px' }}
            onClick={(e) => {
              e.preventDefault()
              onCancel()
            }}
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
