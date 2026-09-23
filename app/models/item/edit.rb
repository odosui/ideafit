class Item::Edit < ApplicationRecord
  belongs_to :item
  belongs_to :user # who edited it
end
