import * as React from 'react'
import api from '../../../../api'

type SecretState =
  | { status: 'hidden' | 'loading' | 'failed' }
  | { status: 'shown'; secret: string | null }

// The secret stays off the page until an admin asks to see it.
export const useEmbedSecret = (pid: string) => {
  const [state, setState] = React.useState<SecretState>({ status: 'hidden' })

  const load = async (request: () => Promise<{ secret: string | null }>) => {
    setState({ status: 'loading' })
    const result = await request().catch(() => null)
    setState(
      result && 'secret' in result
        ? { status: 'shown', secret: result.secret }
        : { status: 'failed' },
    )
  }

  return {
    state,
    reveal: () => load(() => api.embedSecret.show(pid)),
    regenerate: () => load(() => api.embedSecret.regenerate(pid)),
  }
}
