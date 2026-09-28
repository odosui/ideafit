# The global switch for emails about followed items. Sign-in links always go out.
# People a host site signed in get them only once they agreed (see EmbedEmailConsent).
module User::EmailUpdates
  extend ActiveSupport::Concern

  included do
    scope :with_email_updates, -> { reachable_by_email.where(email_updates: true) }
    scope :reachable_by_email, -> { global.or(with_consented_embed_email) }
    generates_token_for :unsubscribe
  end

  def stop_email_updates!
    update!(email_updates: false)
  end
end
