module User::Workspaces
  extend ActiveSupport::Concern

  included do
    has_many :workspace_memberships, class_name: "Workspace::Membership", dependent: :delete_all
    has_many :workspaces, through: :workspace_memberships
  end

  # Admins are the people running a workspace; everyone else takes part on its boards.
  def admin?
    workspace_memberships.exists?
  end

  def home_workspace
    workspaces.order(:id).first
  end
end
