module Item::Voting
  extend ActiveSupport::Concern

  included do
    has_many :votes, dependent: :destroy
  end

  def voted_by?(user)
    user.present? && votes.exists?(user:)
  end

  def upvote!(user)
    transaction do
      votes.find_or_create_by!(user:)
      auto_subscribe!(user, source: :voted)
    end
  end

  def downvote!(user)
    transaction do
      votes.find_by(user:)&.destroy!
      forget_vote_subscription!(user)
    end
  end
end
