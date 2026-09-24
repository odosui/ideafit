class Api::Items::EditsController < Api::BaseController
  before_action :authenticate_user!

  def create
    item = Item.find(params[:item_id])
    unless ItemEditingPolicy.allowed?(current_user, item)
      return render_forbidden('Only the author can edit an item, and only until its status changes')
    end

    item.edit!(title: params[:title], text: params[:text], by: current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end
end
