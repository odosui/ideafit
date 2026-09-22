import * as React from 'react'
import SignInModal from './SignInModal'

const SignInPromptContext = React.createContext<() => void>(() => {})

export const SignInPromptProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <SignInPromptContext.Provider value={() => setOpen(true)}>
      {children}
      <SignInModal open={open} onClose={() => setOpen(false)} />
    </SignInPromptContext.Provider>
  )
}

export const usePromptSignIn = () => React.useContext(SignInPromptContext)
