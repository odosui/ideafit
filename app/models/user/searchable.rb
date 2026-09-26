module User::Searchable
  extend ActiveSupport::Concern

  included do
    scope :matching, ->(query) {
      next all if query.blank?

      pattern = "%#{sanitize_sql_like(query.strip)}%"
      where(arel_table[:name].matches(pattern, "\\").or(arel_table[:email].matches(pattern, "\\")))
    }
  end
end
