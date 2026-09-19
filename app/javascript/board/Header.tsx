import * as React from 'react'
import { useContext } from 'react'
import AppHeader from '../shared/header/AppHeader'
import readServerData from '../shared/server'
import { StateContext } from './StateProvider'

const { user } = readServerData()

function Header() {
  const {
    ui: {
      actions: { showLoginForm },
    },
  } = useContext(StateContext)

  return <AppHeader user={user} onSignIn={showLoginForm} />
}

export default Header
