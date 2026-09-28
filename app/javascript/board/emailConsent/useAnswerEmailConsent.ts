import * as React from 'react'
import showToast from '../../shared/toaster'
import api from '../api'
import { embedSession } from '../embedIdentity/embedSession'

// `answering` is the answer being saved, so controls can show it right away
export const useAnswerEmailConsent = () => {
  const [answering, setAnswering] = React.useState<boolean | null>(null)

  const answer = async (granted: boolean) => {
    setAnswering(granted)
    const user = await api.emailConsent.answer(granted).catch(() => null)
    setAnswering(null)
    if (user && 'embed_email_consent' in user) {
      embedSession.replaceUser(user)
    } else {
      showToast('Your choice could not be saved', 'error')
    }
  }

  return { answer, answering, saving: answering !== null }
}
