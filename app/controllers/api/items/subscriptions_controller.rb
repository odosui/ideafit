class Api::Items::SubscriptionsController < Api::BaseController
  include EmbedAuthentication
  include BoardParticipation

  before_action :authenticate_user!

  def create
    item = participating_item
    item.subscribe!(current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end

  def destroy
    item = participating_item
    item.unsubscribe!(current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end
end
