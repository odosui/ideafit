class MagicLinksController < ApplicationController
  include ReturnToParam

  layout 'auth'

  TOO_MANY_REQUESTS = -> {
    flash.now[:alert] = "Too many attempts. Please try again in a few minutes."
    render :new, status: :too_many_requests
  }

  rate_limit to: 10, within: 15.minutes, only: :create, name: "ip", with: TOO_MANY_REQUESTS
  rate_limit to: 3, within: 15.minutes, only: :create, name: "email",
    by: -> { params[:email].to_s.strip.downcase }, with: TOO_MANY_REQUESTS

  def new; end

  def create
    user = User.find_or_create_by(email: params[:email])
    unless user.persisted?
      flash.now[:alert] = "Please enter a valid email address."
      return render :new, status: :unprocessable_content
    end

    MagicLinkMailer.sign_in_link(user, return_to: return_to_param).deliver_later
    render :sent
  end

  def show
    user = User.find_by_magic_link(params[:token])
    unless user
      return redirect_to new_user_session_path, alert: "That sign-in link is invalid or has expired."
    end

    user.consume_magic_link!
    user.grant_admin_if_eligible!
    user.remember_me = true
    return_to = return_to_param || stored_location_for(:user) || root_path
    sign_in(user)
    redirect_to return_to
  end
end
