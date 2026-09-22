import { Item } from '../../types'

export const toggleVote = (item: Item): Item =>
  item.voted
    ? { ...item, voted: false, votes: item.votes - 1 }
    : { ...item, voted: true, votes: item.votes + 1 }
