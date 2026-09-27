import { useCurrentUser } from '../currentUser/useCurrentUser'
import { usePromptSignIn } from './SignInPrompt'

// Runs the action for signed-in visitors and asks everyone else to sign in first.
export const useRequireSignIn = () => {
  const user = useCurrentUser()
  const promptSignIn = usePromptSignIn()
  return (action: () => void) => (user ? action() : promptSignIn())
}
