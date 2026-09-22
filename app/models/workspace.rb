class Workspace < ApplicationRecord
  DEFAULT_NAME = "Ideafit".freeze

  has_many :memberships, dependent: :delete_all
  has_many :members, through: :memberships, source: :user
  has_many :boards, dependent: :destroy

  validates :name, presence: true

  # A self-hosted instance runs a single workspace.
  def self.primary
    order(:id).first || create!(name: DEFAULT_NAME)
  end

  def member?(user)
    user.present? && memberships.any? { |membership| membership.user_id == user.id }
  end

  def add_member(user)
    memberships.find_or_create_by!(user:)
  end
end
