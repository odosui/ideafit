module Item::Searchable
  extend ActiveSupport::Concern

  included do
    scope :matching, ->(query) {
      next all if query.blank?

      pattern = "%#{sanitize_sql_like(query.strip)}%"
      where(arel_table[:title].matches(pattern, "\\").or(arel_table[:text].matches(pattern, "\\")))
    }
  end
end
