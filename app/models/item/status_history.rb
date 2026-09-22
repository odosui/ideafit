module Item::StatusHistory
  extend ActiveSupport::Concern

  included do
    has_many :status_changes, -> { order(:created_at) }, dependent: :delete_all
  end

  def change_status!(new_status, by:)
    transaction do
      update!(status: new_status)
      status_changes.create!(user: by, status:) if saved_change_to_status?
    end
  end
end
