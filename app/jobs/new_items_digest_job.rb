class NewItemsDigestJob < ApplicationJob
  def perform
    admins = User.with_email_updates.new_item_emails_daily.where(id: Workspace::Membership.select(:user_id))
    admins.find_each(&:send_new_items_digest)
  end
end
