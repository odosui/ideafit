export interface CurrentUser {
  email: string
  name: string | null
  admin: boolean
  email_updates: boolean
}

export const displayName = (user: CurrentUser) => user.name ?? user.email
