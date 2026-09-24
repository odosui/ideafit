# How an admin hears about items posted on their boards.
module User::NewItemEmails
  extend ActiveSupport::Concern

  included do
    enum :new_item_emails, {
      instant: "instant",
      daily: "daily",
      off: "off"
    }, prefix: true, validate: true

    generates_token_for :stop_new_item_emails
  end

  def items_posted_by_others(between:)
    Item.where(board: BoardManagementPolicy.scope(self), created_at: between).where.not(user: self)
  end

  def send_new_items_digest
    now = Time.current
    since = new_items_digested_at || 1.day.ago
    AdminMailer.new_items_digest(self, since:, till: now).deliver_later if items_posted_by_others(between: since...now).exists?
    update!(new_items_digested_at: now)
  end

  def stop_new_item_emails!
    update!(new_item_emails: :off)
  end
end
