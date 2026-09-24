# Unsubscribe links work signed out: the token is the credential.
# Mail providers POST here for one-click unsubscribe (RFC 8058), without a CSRF token.
class Unsubscribes::BaseController < ApplicationController
  layout "auth"

  skip_forgery_protection only: :create

  private

  def render_invalid_link
    render "unsubscribes/invalid", status: :not_found
  end
end
