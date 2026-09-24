module Item::Posting
  extend ActiveSupport::Concern

  class_methods do
    # The author votes for and follows what they post; admins hear about it.
    def post!(by:, **attributes)
      item = transaction do
        create!(user: by, **attributes).tap do |item|
          item.auto_subscribe!(by, source: :created)
          item.upvote!(by)
        end
      end
      Item::NewItemNotificationJob.perform_later(item)
      item
    end
  end

  def admins_to_email
    board.workspace.members.with_email_updates.new_item_emails_instant.where.not(id: user_id)
  end
end
