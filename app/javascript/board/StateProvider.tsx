import * as React from 'react'
import { createContext, useEffect, useState } from 'react'
import api from './api'
import { Item, ItemKind } from './types'
import readServerData from '../shared/server'

const { boardId } = readServerData()
const BOARD_PID = boardId
if (!BOARD_PID) {
  throw new Error('BOARD_PID not set')
}

interface Loadable<T> {
  loading: boolean
  data: T | null
}

function loaded<T>(data: T) {
  return { loading: false, data }
}

export type Filter = 'all' | 'open' | 'done' | 'rejected'

interface IState {
  ui: {
    data: {
      loginFormVisible: boolean
      kindTab: ItemKind
      filter: Filter
    }
    actions: {
      showLoginForm: () => void
      hideLoginForm: () => void
      setFilter: (filter: Filter) => void
    }
  }
  domain: {
    data: {
      items: Loadable<Item[]>
    }
    actions: {
      createItem: (
        kind: ItemKind,
        title: string,
        description: string,
      ) => Promise<void>
      upvote: (id: number) => Promise<void>
      downvote: (id: number) => Promise<void>
      removeItem: (id: number) => Promise<void>
    }
  }
}

export const INITIAL_STATE: IState = {
  ui: {
    data: {
      loginFormVisible: false,
      kindTab: 'idea',
      filter: 'open',
    },
    actions: {
      showLoginForm: () => {},
      hideLoginForm: () => {},
      setFilter: () => {},
    },
  },
  domain: {
    data: {
      items: { loading: false, data: null },
    },
    actions: {
      createItem: async () => {},
      upvote: async () => {},
      downvote: async () => {},
      removeItem: async () => {},
    },
  },
}

export const StateContext = createContext<IState>(INITIAL_STATE)

export const StateProvider: React.FC<React.PropsWithChildren<{ kindTab: ItemKind }>> = ({
  kindTab,
  children,
}) => {
  const [filter, setFilter] = useState<Filter>('open')

  // ========================
  // LOGIN FORM
  // ========================
  const [loginFormVisible, setLoginFormVisible] = useState(false)
  const showLoginForm = () => setLoginFormVisible(true)
  const hideLoginForm = () => setLoginFormVisible(false)


  useEffect(() => {
    loadItems()
  }, [kindTab, filter])

  // ========================
  // ITEMS
  // ========================

  const [items, setItems] = useState<Loadable<Item[]>>({
    loading: false,
    data: null,
  })

  const loadItems = async () => {
    setItems({ loading: true, data: null })
    const res = await api.items.list(BOARD_PID, kindTab, filter)
    setItems({ loading: false, data: res })
  }

  const createItem = async (
    kind: ItemKind,
    title: string,
    description: string,
  ) => {
    await api.items.create(BOARD_PID, kind, title, description)
    loadItems()
  }

  const removeItem = async (id: number) => {
    await api.items.del(id)
    loadItems()
  }

  const upvote = async (id: number) => {
    try {
      await api.items.upvote(id)
    } catch (e: any) {
      console.log(e)
      if (e.response.status === 401) {
        showLoginForm()
        return
      }
    }
    const ii: Item[] = (items.data ?? []).map((i: Item) =>
      i.id === id ? { ...i, voted: true, votes: i.votes + 1 } : i,
    )
    setItems(loaded(ii))
  }

  const downvote = async (id: number) => {
    await api.items.downvote(id)

    const ii: Item[] = (items.data ?? []).map((i: Item) =>
      i.id === id ? { ...i, voted: false, votes: i.votes - 1 } : i,
    )
    setItems(loaded(ii))
  }

  // ========================
  // STATE
  // ========================
  const val: IState = {
    ui: {
      data: {
        loginFormVisible: loginFormVisible,
        kindTab,
        filter,
      },
      actions: {
        showLoginForm,
        hideLoginForm,
        setFilter,
      },
    },
    domain: {
      data: {
        items,
      },
      actions: {
        createItem,
        upvote,
        downvote,
        removeItem,
      },
    },
  }

  return <StateContext.Provider value={val}>{children}</StateContext.Provider>
}
