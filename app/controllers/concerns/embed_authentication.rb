# Signs in users a host site identified, by the Bearer token from Api::Embed::SessionsController.
# With a token present the session is ignored. Include it only where participants act, never in admin controllers.
module EmbedAuthentication
  extend ActiveSupport::Concern

  included do
    skip_forgery_protection if: :embed_token
  end

  private

  def authenticate_user!(...)
    return super unless embed_token

    render json: { success: false, error: "Session expired" }, status: :unauthorized unless current_user
  end

  def current_user
    return super unless embed_token
    return @embed_user if defined?(@embed_user)

    @embed_user = User.find_by_embed_session(embed_token)
  end

  def embed_token
    request.authorization.to_s[/\ABearer (\S+)\z/, 1]
  end
end
