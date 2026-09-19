export interface CurrentUser {
  email: string
  name: string | null
}

export const displayName = (user: CurrentUser) => user.name ?? user.email
