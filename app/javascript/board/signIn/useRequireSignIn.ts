import readServerData from '../../shared/server'
import { usePromptSignIn } from './SignInPrompt'

const { user } = readServerData()

// Runs the action for signed-in visitors and asks everyone else to sign in first.
export const useRequireSignIn = () => {
  const promptSignIn = usePromptSignIn()
  return (action: () => void) => (user ? action() : promptSignIn())
}
