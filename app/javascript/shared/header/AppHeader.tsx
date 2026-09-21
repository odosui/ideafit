import * as React from 'react'
import { signInPath, signOutPath } from '../authPaths'
import { CurrentUser, displayName } from '../currentUser'
import { SETTINGS_PATH } from '../settingsPath'

interface Props {
  user: CurrentUser | null
  onSignIn?: () => void
}

const AppHeader: React.FC<Props> = ({ user, onSignIn }) => {
  const handleSignIn: React.MouseEventHandler = (e) => {
    if (!onSignIn) return
    e.preventDefault()
    onSignIn()
  }

  return (
    <header className="app-header">
      <a className="app-header__brand" href="/">
        <img className="app-header__mark" src="/logo.png" alt="" />
        Ideafit
      </a>

      <div className="app-header__user">
        {user ? (
          <>
            <a
              className="app-header__account"
              href={SETTINGS_PATH}
              title={user.email}
            >
              {displayName(user)}
            </a>
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
