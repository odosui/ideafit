class Unsubscribes::ItemsController < Unsubscribes::BaseController
  before_action :find_subscription

  def show; end

  def create
    @subscription.item.unsubscribe!(@subscription.user)
  end

  private

  def find_subscription
    @subscription = Item::Subscription.find_by_token_for(:unsubscribe, params[:token])
    render_invalid_link unless @subscription
  end
end
