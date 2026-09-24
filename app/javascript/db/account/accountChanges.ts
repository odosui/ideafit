import { CurrentUser, NewItemEmails } from '../../shared/currentUser'

export interface AccountChanges {
  name: string
  email_updates: boolean
  new_item_emails: NewItemEmails
}

export const changesFrom = (user: CurrentUser | null): AccountChanges => ({
  name: user?.name ?? '',
  email_updates: user?.email_updates ?? true,
  new_item_emails: user?.new_item_emails ?? 'instant',
})
