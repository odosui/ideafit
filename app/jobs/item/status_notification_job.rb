class Item::StatusNotificationJob < ApplicationJob
  discard_on ActiveJob::DeserializationError

  def perform(status_change)
    status_change.item.notify_status_change(status_change)
  end
end
