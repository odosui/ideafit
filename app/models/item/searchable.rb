module Item::Searchable
  extend ActiveSupport::Concern

  included do
    scope :matching, ->(query) {
      next all if query.blank?

      pattern = "%#{sanitize_sql_like(query.strip)}%"
      where("items.title ILIKE :pattern OR items.text ILIKE :pattern", pattern:)
    }
  end
end
