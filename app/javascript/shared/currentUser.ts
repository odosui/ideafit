export type NewItemEmails = 'instant' | 'daily' | 'off'

export interface CurrentUser {
  email: string
  name: string | null
  admin: boolean
  email_updates: boolean
  new_item_emails: NewItemEmails
}

export const displayName = (user: CurrentUser) => user.name ?? user.email
