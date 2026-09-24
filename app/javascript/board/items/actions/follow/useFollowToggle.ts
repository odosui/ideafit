import api from '../../../api'
import { useRequireSignIn } from '../../../signIn/useRequireSignIn'
import { Item } from '../../../types'

export const useFollowToggle = (onToggled: (item: Item) => void) => {
  const requireSignIn = useRequireSignIn()

  return (item: Item) =>
    requireSignIn(async () => {
      const changed = await (item.subscribed
        ? api.items.unfollow(item.id)
        : api.items.follow(item.id))
      if (changed) onToggled(changed)
    })
}
