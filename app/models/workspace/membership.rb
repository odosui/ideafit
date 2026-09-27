class Workspace::Membership < ApplicationRecord
  belongs_to :workspace
  belongs_to :user

  validates :user_id, uniqueness: { scope: :workspace_id }
  validate :user_signed_in_by_own_account

  private

  def user_signed_in_by_own_account
    errors.add(:user, "signed in by a host site can't run a workspace") if user&.embedded?
  end
end
