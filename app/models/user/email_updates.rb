# The global switch for emails about followed items. Sign-in links always go out.
module User::EmailUpdates
  extend ActiveSupport::Concern

  included do
    scope :with_email_updates, -> { where(email_updates: true) }
    generates_token_for :unsubscribe
  end

  def stop_email_updates!
    update!(email_updates: false)
  end
end
