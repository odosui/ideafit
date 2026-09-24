class Item < ApplicationRecord
  include Sortable
  include Searchable
  include StatusHistory
  include EditHistory
  include Voting
  include Subscriptions
  include StatusNotifications
  include Posting

  belongs_to :user # author
  belongs_to :board

  enum :kind, {
    idea: 'idea',
    bug: 'bug',
    question: 'question'
  }, validate: true

  enum :status, {
    fresh: "fresh",
    planned: "planned",
    in_progress: "in_progress",
    done: "done",
    rejected: 'rejected'
  }, validate: true

  validates_presence_of :user, :title, :kind

  scope :of_kind, ->(kind) { kind.present? ? where(kind:) : all }
  scope :with_status, ->(status) { status.present? ? where(status:) : all }
  scope :most_voted_first, -> { order(votes_count: :desc, created_at: :desc) }
  scope :with_progress, ->(filter) {
    case filter
    when 'done' then done
    when 'open' then where(status: %w[fresh planned in_progress])
    when 'rejected' then rejected
    else not_rejected
    end
  }

  def authored_by?(someone)
    someone.present? && user_id == someone.id
  end

end
