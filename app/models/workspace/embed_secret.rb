# Signs the JWTs a host site uses to sign its users in to embedded boards.
# Regenerating keeps the previous secret valid, so the site can switch over without downtime.
module Workspace::EmbedSecret
  extend ActiveSupport::Concern

  included do
    encrypts :embed_secret, :previous_embed_secret
  end

  def embed_secrets
    [embed_secret, previous_embed_secret].compact
  end

  def regenerate_embed_secret!
    update!(previous_embed_secret: embed_secret, embed_secret: SecureRandom.hex(32))
  end
end
