# A host site's users are emailed only if its workspace trusts the site's emails
# and they said yes. A new address from the site means asking again.
module User::EmbedEmailConsent
  extend ActiveSupport::Concern

  included do
    scope :with_vouched_email, -> {
      where(embed_workspace_id: Workspace.trusting_embed_emails.select(:id)).where.not(email: "")
    }
    scope :with_consented_embed_email, -> { with_vouched_email.where.not(email_consent_answered_at: nil) }

    before_save :forget_email_consent, if: -> { embedded? && persisted? && will_save_change_to_email? }
  end

  # :none when there's nothing to ask about, :pending until they answer, then :answered
  def embed_email_consent
    return :none unless vouched_email?

    email_consent_answered_at ? :answered : :pending
  end

  def answer_email_consent!(granted)
    update!(email_updates: granted, email_consent_answered_at: Time.current)
  end

  private

  def vouched_email?
    embedded? && email.present? && embed_workspace.trust_embed_emails?
  end

  def forget_email_consent
    self.email_consent_answered_at = nil
    self.email_updates = true
  end
end
