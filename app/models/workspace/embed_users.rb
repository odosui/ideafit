# The people a host site signs in to this workspace's embedded boards, known by the site's own user ids.
module Workspace::EmbedUsers
  extend ActiveSupport::Concern

  included do
    has_many :embed_users, class_name: "User", foreign_key: :embed_workspace_id, inverse_of: :embed_workspace
  end

  def identify_embed_user!(profile)
    embed_users.find_or_initialize_by(external_id: profile.external_id).tap do |user|
      user.update!(profile.attributes)
    end
  end
end
