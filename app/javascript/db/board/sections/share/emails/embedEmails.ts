export interface EmbedEmails {
  trust_emails: boolean
  page_url: string | null
}

export interface EmbedEmailsRejection {
  success: false
  errors: string[]
}
