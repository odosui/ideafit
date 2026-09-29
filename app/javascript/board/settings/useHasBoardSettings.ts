import { useCurrentUser } from '../currentUser/useCurrentUser'

// Only a host site's users who were asked about emails have anything to set.
export const useHasBoardSettings = () =>
  useCurrentUser()?.embed_email_consent === 'answered'
