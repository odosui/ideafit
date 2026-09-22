import * as React from 'react'
import AppHeader from '../shared/header/AppHeader'
import readServerData from '../shared/server'
import { usePromptSignIn } from './signIn/SignInPrompt'

const { user } = readServerData()

const Header: React.FC = () => {
  const promptSignIn = usePromptSignIn()
  return <AppHeader user={user} onSignIn={promptSignIn} />
}

export default Header
