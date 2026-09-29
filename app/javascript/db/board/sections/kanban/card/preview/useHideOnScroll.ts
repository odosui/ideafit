import * as React from 'react'

export const useHideOnScroll = (active: boolean, hide: () => void) => {
  React.useEffect(() => {
    if (!active) return

    window.addEventListener('scroll', hide, true)
    return () => window.removeEventListener('scroll', hide, true)
  }, [active, hide])
}
