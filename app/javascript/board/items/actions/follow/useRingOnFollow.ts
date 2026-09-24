import * as React from 'react'

// True for one bell swing right after the item becomes followed
export const useRingOnFollow = (following: boolean) => {
  const [ringing, setRinging] = React.useState(false)
  const wasFollowing = React.useRef(following)

  React.useEffect(() => {
    if (following && !wasFollowing.current) setRinging(true)
    wasFollowing.current = following
  }, [following])

  return { ringing, stopRinging: () => setRinging(false) }
}
