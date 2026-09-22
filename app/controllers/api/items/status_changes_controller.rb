class Api::Items::StatusChangesController < Api::BaseController
  before_action :authenticate_user!

  def index
    item = Item.find(params[:item_id])
    unless item.board.owned_by?(current_user)
      return render_forbidden('Only the board owner can see the status history')
    end

    changes = item.status_changes.reorder(created_at: :desc, id: :desc).includes(:user)
    render json: changes.map { |change| Db::StatusChangeSerializer.new(change) }
  end
end
