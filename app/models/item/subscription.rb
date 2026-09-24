class Item::Subscription < ApplicationRecord
  belongs_to :item
  belongs_to :user

  enum :source, {
    created: "created",
    voted: "voted",
    manual: "manual"
  }, prefix: true, validate: true

  scope :active, -> { where(unsubscribed_at: nil) }
end
