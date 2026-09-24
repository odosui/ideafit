class Unsubscribes::EmailsController < Unsubscribes::BaseController
  before_action :find_user

  def show; end

  def create
    @user.stop_email_updates!
  end

  private

  def find_user
    @user = User.find_by_token_for(:unsubscribe, params[:token])
    render_invalid_link unless @user
  end
end
