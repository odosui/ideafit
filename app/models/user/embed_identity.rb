# Users a host site signs in to its embedded boards with a JWT. Each belongs to
# that site's workspace and is known by the site's own user id, never by email.
module User::EmbedIdentity
  extend ActiveSupport::Concern

  EMBED_SESSION_LIFETIME = 1.hour

  included do
    belongs_to :embed_workspace, class_name: "Workspace", optional: true

    scope :global, -> { where(embed_workspace_id: nil) }
    scope :embedded, -> { where.not(embed_workspace_id: nil) }

    validates :external_id, presence: true, uniqueness: { scope: :embed_workspace_id }, if: :embedded?
    validates :avatar_url, format: { with: %r{\Ahttps://}i }, allow_nil: true

    generates_token_for :embed_session, expires_in: EMBED_SESSION_LIFETIME
  end

  class_methods do
    def find_by_embed_session(token)
      embedded.find_by_token_for(:embed_session, token)
    end
  end

  def embedded?
    embed_workspace_id.present?
  end
end
