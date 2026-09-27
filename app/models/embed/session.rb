# Trades a host site's JWT for a short-lived Ideafit token that signs its user in to embedded boards.
class Embed::Session
  Invalid = Class.new(StandardError)

  attr_reader :user

  def self.start(workspace:, jwt:)
    payload = Embed::IdentityToken.verify(jwt, secrets: workspace.embed_secrets)
    new(workspace.identify_embed_user!(Embed::Profile.new(payload)))
  rescue Embed::IdentityToken::Invalid, Embed::Profile::Invalid => error
    raise Invalid, error.message
  end

  def initialize(user)
    @user = user
  end

  def as_json(*)
    {
      token: user.generate_token_for(:embed_session),
      expires_at: User::EMBED_SESSION_LIFETIME.from_now,
      user: UserSerializer.new(user),
    }
  end
end
