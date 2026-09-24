class Api::Items::SubscriptionsController < Api::BaseController
  before_action :authenticate_user!

  def create
    item = Item.find(params[:item_id])
    item.subscribe!(current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end

  def destroy
    item = Item.find(params[:item_id])
    item.unsubscribe!(current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end
end
