module Item::EditHistory
  extend ActiveSupport::Concern

  included do
    has_many :edits, -> { order(:created_at) }, dependent: :delete_all
  end

  def edit!(title:, text:, by:)
    transaction do
      previous = { previous_title: self.title, previous_text: self.text }
      update!(title:, text:)
      edits.create!(user: by, **previous) if saved_change_to_title? || saved_change_to_text?
    end
  end
end
