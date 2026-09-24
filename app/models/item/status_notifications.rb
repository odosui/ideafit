# Emails followers about a status change once the admin has settled on it:
# only the latest change in a burst is sent, and never the same status twice.
module Item::StatusNotifications
  extend ActiveSupport::Concern

  NOTIFIED_STATUSES = %w[planned in_progress done rejected].freeze
  SETTLE_TIME = 10.minutes

  def notify_status_change_later(change)
    Item::StatusNotificationJob.set(wait: SETTLE_TIME).perform_later(change)
  end

  def notify_status_change(change)
    return unless change == status_changes.last && status_worth_notifying?

    update!(notified_status: status)
    emailed_subscriptions(except: change.user).each do |subscription|
      ItemUpdateMailer.status_changed(subscription, status).deliver_later
    end
  end

  private

  def status_worth_notifying?
    NOTIFIED_STATUSES.include?(status) && status != notified_status
  end
end
