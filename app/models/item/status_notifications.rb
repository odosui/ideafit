# Followers hear about a status once an admin sends the board's outbox,
# and never about the same status twice. "New" and "ready to ship" stay quiet.
module Item::StatusNotifications
  extend ActiveSupport::Concern

  NOTIFIED_STATUSES = %w[planned in_progress done rejected].freeze

  included do
    scope :awaiting_status_notification, -> {
      where(status: NOTIFIED_STATUSES).where("items.notified_status IS NULL OR items.notified_status != items.status")
    }
  end

  def status_notification_subscriptions
    emailed_subscriptions(except: status_changes.last&.user)
  end

  def mark_status_notified!
    update!(notified_status: status)
  end
end
