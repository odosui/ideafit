import * as React from 'react'
import AppHeader from '../shared/header/AppHeader'
import { useCurrentUser } from './currentUser/useCurrentUser'
import { usePromptSignIn } from './signIn/SignInPrompt'

const Header: React.FC = () => {
  const user = useCurrentUser()
  const promptSignIn = usePromptSignIn()
  return <AppHeader user={user} onSignIn={promptSignIn} />
}

export default Header
