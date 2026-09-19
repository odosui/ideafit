import * as React from 'react'
import { CurrentUser } from '../../shared/currentUser'

interface CurrentUserState {
  user: CurrentUser | null
  setUser: (user: CurrentUser) => void
}

const CurrentUserContext = React.createContext<CurrentUserState>({
  user: null,
  setUser: () => {},
})

export const CurrentUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState(window.user)
  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)
