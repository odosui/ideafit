class Item::StatusChange < ApplicationRecord
  belongs_to :item
  belongs_to :user # who changed it

  validates :status, inclusion: { in: Item.statuses.keys }
end
