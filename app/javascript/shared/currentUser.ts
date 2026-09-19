export interface CurrentUser {
  email: string
  name: string | null
  admin: boolean
}

export const displayName = (user: CurrentUser) => user.name ?? user.email
