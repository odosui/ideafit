# A host site vouches for its users' emails by signing them into the JWT.
# Ideafit can't verify them, so it emails them only once an admin opts in.
module Workspace::EmbedEmails
  extend ActiveSupport::Concern

  included do
    scope :trusting_embed_emails, -> { where(trust_embed_emails: true) }
  end
end
