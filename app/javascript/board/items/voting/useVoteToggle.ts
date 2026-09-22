import api from '../../api'
import { useRequireSignIn } from '../../signIn/useRequireSignIn'
import { Item } from '../../types'
import { toggleVote } from './toggleVote'

export const useVoteToggle = (onToggled: (item: Item) => void) => {
  const requireSignIn = useRequireSignIn()

  return (item: Item) =>
    requireSignIn(async () => {
      await (item.voted ? api.items.downvote(item.id) : api.items.upvote(item.id))
      onToggled(toggleVote(item))
    })
}
