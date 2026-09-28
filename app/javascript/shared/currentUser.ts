export type NewItemEmails = 'instant' | 'daily' | 'off'

// Whether a host site's user has been asked about emails; 'none' when there's nothing to ask
export type EmbedEmailConsent = 'none' | 'pending' | 'answered'

export interface CurrentUser {
  email: string
  name: string | null
  admin: boolean
  embedded: boolean
  email_updates: boolean
  embed_email_consent: EmbedEmailConsent
  new_item_emails: NewItemEmails
}

export const displayName = (user: CurrentUser) => user.name ?? user.email
