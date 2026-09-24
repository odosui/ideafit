class Item::NewItemNotificationJob < ApplicationJob
  discard_on ActiveJob::DeserializationError

  def perform(item)
    item.admins_to_email.each do |admin|
      AdminMailer.new_item(admin, item).deliver_later
    end
  end
end
