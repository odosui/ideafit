class Api::Items::HistoryController < Api::BaseController
  before_action :authenticate_user!

  def show
    item = Item.find(params[:item_id])
    unless BoardManagementPolicy.allowed?(current_user, item.board)
      return render_forbidden('Only workspace admins can see the item history')
    end

    events = Item::History.new(item).events
    render json: events.map { |event| Db::HistoryEventSerializer.for(event) }
  end
end
