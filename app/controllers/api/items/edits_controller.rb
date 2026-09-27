class Api::Items::EditsController < Api::BaseController
  include EmbedAuthentication
  include BoardParticipation

  before_action :authenticate_user!

  def create
    item = participating_item
    unless ItemEditingPolicy.allowed?(current_user, item)
      return render_forbidden('Only the author can edit an item, and only until its status changes')
    end

    item.edit!(title: params[:title], text: params[:text], by: current_user)
    render json: ItemSerializer.new(item, viewer: current_user)
  end
end
