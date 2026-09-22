module Item::Sortable
  extend ActiveSupport::Concern

  ORDERS = {
    "newest" => { created_at: :desc },
    "oldest" => { created_at: :asc },
    "most_voted" => { votes_count: :desc, created_at: :desc },
  }.freeze

  included do
    scope :sorted_by, ->(sort) { order(ORDERS.fetch(sort.to_s, ORDERS["newest"])) }
  end
end
