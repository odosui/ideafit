import * as React from 'react'
import { signInPath, signOutPath } from '../authPaths'

interface Props {
  email: string | null
  onSignIn?: () => void
}

const AppHeader: React.FC<Props> = ({ email, onSignIn }) => {
  const handleSignIn: React.MouseEventHandler = (e) => {
    if (!onSignIn) return
    e.preventDefault()
    onSignIn()
  }

  return (
    <header className="app-header">
      <a className="app-header__brand" href="/">
        <span className="app-header__mark" />
        Ideafit
      </a>

      <div className="app-header__user">
        {email ? (
          <>
            <span className="app-header__email">{email}</span>
            <a className="app-header__link" href={signOutPath()}>
              Log out
            </a>
          </>
        ) : (
          <a className="app-header__link" href={signInPath()} onClick={handleSignIn}>
            Sign in
          </a>
        )}
      </div>
    </header>
  )
}

export default AppHeader
