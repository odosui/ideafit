class Unsubscribes::NewItemsController < Unsubscribes::BaseController
  before_action :find_user

  def show; end

  def create
    @user.stop_new_item_emails!
  end

  private

  def find_user
    @user = User.find_by_token_for(:stop_new_item_emails, params[:token])
    render_invalid_link unless @user
  end
end
