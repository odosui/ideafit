import * as React from 'react'
import readServerData from '../../shared/server'
import { embedSession } from '../embedIdentity/embedSession'

const { user: sessionUser } = readServerData()

const currentUser = () => embedSession.current()?.user ?? sessionUser

export const useCurrentUser = () =>
  React.useSyncExternalStore(embedSession.subscribe, currentUser)
